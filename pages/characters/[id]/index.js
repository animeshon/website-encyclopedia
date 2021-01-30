import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import getSummary from '@/queries/character/Summary';
import getAppearances from '@/queries/character/Appearances';

import SummaryText from '@/components/Summary/SummaryText';
import SummaryImages from '@/components/Summary/SummaryImages';
import SummaryAppearance from '@/components/Summary/SummaryAppearance';
import DetailsCard from '@/components/DetailsCard';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as stat from '@/utilities/ContentStatus';
import * as uri from '@/utilities/URI';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { PrepareKeyQuery, ExecuteQueryBatch } from '@/utilities/Query';

const Character = ({
    description,
    images,
    appearances,
    details,
    hrefs
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryImages images={images} />
                <SummaryAppearance appearances={appearances} />
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
    const queries = [
        PrepareKeyQuery("info", { id: id }, getSummary()),
        PrepareKeyQuery("appearance", { id: id, first: 7 }, getAppearances()),
    ];
    const { info, appearance } = await ExecuteQueryBatch(client, queries);

    const appearances = (appearance.appearance || []).map(i => {
        const { id, __typename, status, runnings, images, descriptions, names, ageRatings } = i.content;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images, ageRatings),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            description: locale.English(descriptions),
            season: season.JapanAny(runnings),
            status: stat.Status(status),
            relation: i.relation,
        };
    });

    const images = image.All(info.images);

    const guiseOf = info.guiseOf ? {
        id: info.guiseOf.id,
        type: info.guiseOf.__typename,
        name: locale.LatinAny(info.guiseOf.names),
    } : undefined;

    const birthday = info.birthday ? (new Date(birthday)).toLocaleDateString('en-US') : info.birthdayFallback

    return {
        description: locale.English(info.descriptions),
        images: images,
        appearances: appearances,
        details: [
            [
                { key: 'English', value: locale.English(info.names) },
                { key: 'Japanese', value: locale.Japanese(info.names) },
                { key: 'Romaji', value: locale.Romaji(info.names) },
            ],
            [
                { key: 'Birthday', value: birthday != '' ? birthday : undefined },
                { key: 'Guise of', value: guiseOf != undefined ? uri.Rewrite(guiseOf.type, guiseOf.names, guiseOf.id) : undefined },
            ]
        ]
    };
};

export default withContainer(Character);
export const getServerSideProps = withContainerProps(getProps);
