import React from 'react';

import getDoujinshiSummary from '@/queries/doujinshi/Summary';

import DetailsCard from '@/components/DetailsCard';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
// import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';

import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Doujinshi = ({
    type,
    id,
    title,
    description,
    characters,
    details,
    canonicals,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryCharacter id={id} type={type} title={title} characters={characters} />
                {/* <SummaryTimeline /> */}
                <SummaryCanonical id={id} title={title} canonicals={canonicals} />
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
    const data = await ExecuteQuery(ctx, { id:id }, getDoujinshiSummary(), (data, err) => { return data.result; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
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
        type: 'Doujinshi',
        description: locale.English(data.descriptions),
        characters: characters,
        canonicals: undefined, // TODO: data.partOfCanonicals
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
                { key: 'Status', value: data.status?.toLowerCase() },
                { key: 'Published', value: undefined }, // TODO: <---------------------------
                { key: 'Age Rating', value: AgeRating(data.ageRatings, ['USA']) },
            ],
            [
                { key: 'Genres', value: genres },
                { key: 'Universes', value: universes },
            ]
        ]
    };
};

export default withContainer(Doujinshi);
