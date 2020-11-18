import React from 'react';

import getSummary from '@/queries/circle/Summary';

import DetailsCard from '@/components/DetailsCard';
import withContainer from '@/components/Container';
import SummaryText from '@/components/SummaryText';
import SummaryMember from '@/components/SummaryMember';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Circle = ({
    type,
    id,
    title,
    description,
    members,
    details,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryMember id={id} type={type} title={title} members={members} />
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

Circle.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getSummary()));

    const members = (data.members || []).map(i => {
        const { id, images, names } = i;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    return {
        id: data.id,
        type: 'Circle',
        description: locale.English(data.descriptions),
        members: members,
        details: [
            [
                { key: 'English', value: locale.English(data.names) },
                { key: 'Japanese', value: locale.Japanese(data.names) },
                { key: 'Romaji', value: locale.Romaji(data.names) },
            ],
            [
                { key: 'Foundation', value: data.foundation },
                { key: 'Members', value: data.members?.length },
            ]
        ]
    };
};

export default withContainer(Circle);
