import React from 'react';

import GetSummary from '@/queries/GetSummary';
import ContainerQuery from '@/queries/container/Container';

import DetailsCard from '@/components/DetailsCard';
import SummaryVoiceActings from '@/components/Summary/SummaryVoiceActings';
import withContainer, { withContainerProps } from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';

import SummaryDataType from '@/models/summary';

import { ExecuteQueryBatch, PrepareKeyQuery, PrepareQuery, ExecuteQueries } from '@/utilities/Query';
import EntityList from '@/models/entity-list';
import BooleanString from '@/models/boolean-string';

const PersonPage = ({
    info,
    voiceActings,
}) => {
    const model = new SummaryDataType();
    model.loadRawData(info);
    model.Localize();

    const voiceActingModels = EntityList.DefaultFromRawData(voiceActings);
    voiceActingModels.Localize();

    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={model.GetDescription()} />
                <SummaryVoiceActings characters={voiceActingModels} />
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <DetailsCard items={model.Details()} />
            </aside>
        </div>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");

    const queries = [
        PrepareKeyQuery("info", { id: id }, GetSummary()),
    ];
    const { info } = await ExecuteQueryBatch(client, queries);

    // prune double characters
    let characters = [];
    (info.voiceActings || []).forEach(i => {
        const { isPrimary, voiced: { name, appearancesAggregate } } = i;
        const isPrimaryBool = new BooleanString(isPrimary);
        if (isPrimaryBool.Value() != true || appearancesAggregate?.count == 0 || appearancesAggregate?.count == undefined || characters.find(i => i.name === name)) {
            return;
        }

        characters.push({
            name: name,
            mainCount: appearancesAggregate.count
        })
    });

    // Get voice actings of primary characters
    characters = characters.sort((a, b) => { return a.mainCount > b.mainCount ? -1 : 1; }).slice(0, 5);

    // enqueue graphql query to get details
    const charQueries = characters.map(x => {
        return PrepareQuery({ id: x.name }, ContainerQuery());
    });
    // wait
    const chars = await ExecuteQueries(client, charQueries);

    return {
        info: info || {},
        voiceActings: chars || [],
    };
};

export default withContainer(PersonPage);
export const getServerSideProps = withContainerProps(getProps);