import React from 'react';

import withContainer from '@/components/Container';
import getSummary from '@/queries/character/Summary';

import SummaryText from '@/components/SummaryText';
import SummaryImages from '@/components/SummaryImages';
import SummaryAppearance from '@/components/SummaryAppearance';
import DetailsCard from '@/components/DetailsCard';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as uri from '@/utilities/URI';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery } from '@/utilities/Query';

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
                <SummaryImages images={images} href={hrefs.pictures}/>

                <SummaryAppearance appearances={appearances} href={hrefs.appearances}/>
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

Character.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id: id }, getSummary(), (data, err) => { return data.result; });

    const appearances = (data.appearance || []).map(i => {
        const { id, __typename, status, runnings, images, descriptions, names } = i.content;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.LatinAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            description: locale.English(descriptions),
            season: season.JapanAny(runnings),
            status: status?.toLowerCase(),
            relation: i.relation,
        };
    });

    const images = image.All(data.images);

    const guiseOf = data.guiseOf ? {
        id: data.guiseOf.id,
        type: data.guiseOf.__typename,
        name: locale.LatinAny(data.guiseOf.names),
    } : undefined;

    const birthday = data.birthday ? (new Date(birthday)).toLocaleDateString('en-US') : data.birthdayFallback

    return {
        description: locale.English(data.descriptions),
        images: images,
        appearances: appearances,
        hrefs: {
            pictures: uri.Rewrite('Character', locale.LatinAny(data.names), id, "pictures"),
            appearances: uri.Rewrite('Character', locale.LatinAny(data.names), id, "appearances"),
        },
        details: [
            [
                { key: 'English', value: locale.English(data.names) },
                { key: 'Japanese', value: locale.Japanese(data.names) },
                { key: 'Romaji', value: locale.Romaji(data.names) },
            ],
            [
                { key: 'Birthday', value: birthday != '' ? birthday : undefined },
                { key: 'Guise of', value: guiseOf != undefined ? uri.Rewrite(guiseOf.type, guiseOf.names, guiseOf.id) : undefined },
            ]
        ]
    };
};

export default withContainer(Character);
