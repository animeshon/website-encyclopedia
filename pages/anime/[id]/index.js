import React from 'react';

import getSummary from '@/queries/anime/Summary';
import getRelated from '@/queries/anime/Related';

import DetailsCard from '@/components/DetailsCard';
import withContainer from '@/components/Container';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
// import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';
import SummaryRelated from '@/components/SummaryRelated';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as stat from '@/utilities/ContentStatus';
import * as contentRelation from '@/utilities/ContentRelation';
import { Type } from '@/utilities/MediaType';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Anime = ({
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

Anime.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("info", { id: id }, getSummary()),
        PrepareKeyQuery("related", { id: id }, getRelated()),
    ];
    const {info, related} = await ExecuteQueryBatch(ctx, queries);
    
    const characters = (info.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    const genres = (info.genres || []).map(genre => {
        return { text: locale.EnglishAny(genre.names) };
    });

    const universes = (info.partOfCanonicals?.partOfUniverses || []).map(universe => {
        return {
            href: uri.Rewrite('Universe', locale.EnglishAny(universe.names), universe.id),
            text: locale.EnglishAny(universe.names),
        }
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

    return {
        description: locale.English(info.descriptions),
        characters: characters,
        canonicals: undefined, // TODO: info.partOfCanonicals
        related: relatedContent,
        details: [
            [
                { key: 'English', value: locale.English(info.names) },
                { key: 'Japanese', value: locale.Japanese(info.names) },
                { key: 'Romaji', value: locale.Romaji(info.names) },
            ],
            [
                { key: 'Media', value: info.type },
                { key: 'Episodes', value: info.episodes?.length },
                { key: 'Status', value: stat.Status(info.status) },
                { key: 'Season', value: season.JapanAny(info.runnings) },
                { key: 'Age Rating', value: AgeRating(info.ageRatings, ['USA']), flag: 'us' },
            ],
            [
                { key: 'Genres', value: genres },
                { key: 'Universes', value: universes },
            ]
        ]
    };
};

export default withContainer(Anime);
