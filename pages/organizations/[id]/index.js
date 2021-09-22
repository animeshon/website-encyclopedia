import React from 'react';

import GetSummary from '@/queries/GetSummary';

import DetailsCard from '@/components/DetailsCard';
import withContainer, { withContainerProps } from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryMember from '@/components/Summary/SummaryMember';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import SummaryDataType from '@/models/summary';

const Organization = ({
    info,
}) => {
    const model = new SummaryDataType(info);
    model.Localize();

    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={model.GetDescription()} />
                {/* TODO: Add productions for organization. */}
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

const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const info = await ExecuteQuery(client, PrepareQuery({ id: id }, GetSummary()));

    return {
        info
    };
};

export default withContainer(Organization);
export const getServerSideProps = withContainerProps(getProps);
