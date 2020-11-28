import React from 'react';

import getSummary from '@/queries/organization/Summary';

import DetailsCard from '@/components/DetailsCard';
import withContainer from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryMember from '@/components/Summary/SummaryMember';

import * as locale from '@/utilities/Localization';
import * as contentFocus from '@/utilities/ContentFocus';
import * as time from '@/utilities/Time';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Organization = ({
    description,
    details,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                {/* TODO: Add productions for organization. */}
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

Organization.getInitialProps = async ctx => {
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
                { key: 'Foundation', value: time.EnglishDate(data.foundation) },
                { key: 'Content Focus', value: contentFocus.Focus(data.contentFocus) },
            ]
        ]
    };
};

export default withContainer(Organization);
