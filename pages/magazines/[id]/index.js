import React from 'react';

import getSummary from '@/queries/magazine/Summary';

import DetailsCard from '@/components/DetailsCard';
import withContainer, { withContainerProps } from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';

import * as locale from '@/utilities/Localization';
import * as audienceTarget from '@/utilities/AudienceTarget';
import * as season from '@/utilities/Season';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Magazine = ({
    description,
    details,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <DetailsCard items={details} />
            </aside>
        </div>
    );
};

export const getProps = async (ctx, client) => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, getSummary()));

    return {
        description: locale.English(data.descriptions),
        details: [
            [
                { key: 'English', value: locale.English(data.names) },
                { key: 'Japanese', value: locale.Japanese(data.names) },
                { key: 'Romaji', value: locale.Romaji(data.names) },
            ],
            [
                { key: 'Running', value: season.JapanAny(data.runnings) },
                { key: 'Audience Target', value: audienceTarget.Target(data.audienceTarget) },
            ]
        ]
    };
};

export default withContainer(Magazine);
export const getServerSideProps = withContainerProps(getProps);