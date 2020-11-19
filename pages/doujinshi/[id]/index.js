import React from 'react';

import getSummary from '@/queries/doujinshi/Summary';
import getRelated from '@/queries/doujinshi/Related';

import DetailsCard from '@/components/DetailsCard';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
// import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';
import SummaryRelated from '@/components/SummaryRelated';

import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as stat from '@/utilities/ContentStatus';
import * as contentRelation from '@/utilities/ContentRelation';
import { Type } from '@/utilities/MediaType';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Doujinshi = ({
    description,
    characters,
    details,
    canonicals,
    related,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryCharacter characters={characters} />
                <SummaryRelated related={related} />
                {/* <SummaryTimeline /> */}
                <SummaryCanonical canonicals={canonicals} />
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

Doujinshi.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("data", { id: id }, getSummary()),
        PrepareKeyQuery("related", { id: id }, getRelated()),
    ];
    const {data, related} = await ExecuteQueryBatch(ctx, queries);
    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images, data.ageRatings),
        };
    });

    const relatedContent = (related.relations || []).map(i => {
        const { id, __typename, status, runnings, images, names, ageRatings } = i.object;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            image: image.ProfileAny(images, ageRatings),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            season: season.JapanAny(runnings),
            status: stat.Status(status),
            relation: contentRelation.Type(i.type),
        };
    });

    const genres = (data.genres || []).map(genre => {
        return { text: locale.EnglishAny(genre.names) };
    });

    const universes = (data.partOfCanonicals?.partOfUniverses || []).map(universe => {
        return {
            href: uri.Rewrite('Universe', locale.EnglishAny(universe.names), universe.id),
            text: locale.EnglishAny(universe.names),
        }
    });

    return {
        characters: characters,
        canonicals: undefined, // TODO: data.partOfCanonicals
        related: relatedContent,
        details: [
            [
                { key: 'English', value: locale.English(data.names) },
                { key: 'Japanese', value: locale.Japanese(data.names) },
                { key: 'Romaji', value: locale.Romaji(data.names) },
            ],
            [
                { key: 'Media', value: data.type },
                { key: 'Chapters', value: data.chapters?.length },
                { key: 'Volumes', value: data.volumes?.length },
                { key: 'Status', value: stat.Status(data.status) },
                { key: 'Published', value: undefined }, // TODO: <---------------------------
                { key: 'Age Rating', value: AgeRating(data.ageRatings, ['USA']), flag: 'us' },
            ],
            [
                { key: 'Genres', value: genres },
                { key: 'Universes', value: universes },
            ]
        ]
    };
};

export default withContainer(Doujinshi);
