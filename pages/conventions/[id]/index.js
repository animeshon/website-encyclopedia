import React from 'react';

import GetSummary from '@/queries/GetSummary';

import DetailsCard from '@/components/DetailsCard';
import withContainer, { withContainerProps } from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import SummaryDataType from '@/models/summary';

const Convention = ({
    info,
}) => {
    const model = new SummaryDataType();
    model.loadRawData(info);
    model.Localize();

    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={model.GetDescription()} />
                {/* TODO: Add productions for Convention. */}
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
    const info = await ExecuteQuery(client, PrepareQuery({ id: id }, GetSummary()));

    return {
        info
    };
};

export default withContainer(Convention);
export const getServerSideProps = withContainerProps(getProps);