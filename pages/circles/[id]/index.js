import React from 'react';

import getSummary from '@/queries/circle/Summary';

import DetailsCard from '@/components/DetailsCard';
import withContainer, { withContainerProps } from '@/components/Container';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryMember from '@/components/Summary/SummaryMember';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as time from '@/utilities/Time';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Circle = ({
    description,
    members,
    details,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryMember members={members} />
                {/* TODO: Add productions for circle. */}
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

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, getSummary()));

    const members = (data.members || []).map(i => {
        const { id, images, names } = i;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    return {
        description: locale.English(data.descriptions),
        members: members,
        details: [
            [
                { key: 'English', value: locale.English(data.names) },
                { key: 'Japanese', value: locale.Japanese(data.names) },
                { key: 'Romaji', value: locale.Romaji(data.names) },
            ],
            [
                { key: 'Foundation', value: time.EnglishDate(data.foundation) },
                { key: 'Members', value: data.members?.length },
            ]
        ]
    };
};

export default withContainer(Circle);
export const getServerSideProps = withContainerProps(getProps);
