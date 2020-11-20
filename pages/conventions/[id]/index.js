import React from 'react';

import getSummary from '@/queries/convention/Summary';

import DetailsCard from '@/components/DetailsCard';
import withContainer from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryMember from '@/components/Summary/SummaryMember';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as time from '@/utilities/Time';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Convention = ({
    description,
    details,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                {/* TODO: Add productions for convention. */}
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

Convention.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getSummary()));

    return {
        description: locale.English(data.descriptions),
        details: [
            [
                { key: 'English', value: locale.English(data.names) },
                { key: 'Japanese', value: locale.Japanese(data.names) },
                { key: 'Romaji', value: locale.Romaji(data.names) },
            ],
            [
                { key: 'Year', value: `${(new Date(data.from)).getFullYear()}`},
                { key: 'Date', value: time.FormatNoYear(new Date(data.from), new Date(data.to))},
                { key: 'Address', value: data.address?.formattedAddress },
            ]
        ]
    };
};

export default withContainer(Convention);
