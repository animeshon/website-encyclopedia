import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import GetSummary from '@/queries/GetSummary';
import GetAppearances from '@/queries/GetAppearances';

import SummaryText from '@/components/Summary/SummaryText';
import SummaryImages from '@/components/Summary/SummaryImages';
import SummaryAppearance from '@/components/Summary/SummaryAppearance';
import DetailsCard from '@/components/DetailsCard';

import SummaryDataType from '@/models/summary';
import { CharacterDataModelList } from '@/models/character';

import { PrepareKeyQuery, ExecuteQueryBatch } from '@/utilities/Query';

const Character = ({
    info,
    appearances,
}) => {
    const model = new SummaryDataType(info);
    model.Localize();

    const appearancesModel = CharacterDataModelList.FromContentRawData(appearances);
    appearancesModel.Localize();
    appearancesModel.Sort();

    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={model.GetDescription()} />
                {/* <SummaryImages images={images} /> */}
                <SummaryAppearance appearances={appearancesModel} />
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
        PrepareKeyQuery("appearance", { id: id, first: 7 }, GetAppearances()),
    ];
    const { info, appearance } = await ExecuteQueryBatch(client, queries);

    return {
        info,
        appearances: appearance.appearances || [],
    };
};

export default withContainer(Character);
export const getServerSideProps = withContainerProps(getProps);
