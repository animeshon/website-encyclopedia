import React from 'react';

import getAnimeSummary from '@/queries/anime/Summary';

import { AnimeDetailsBox } from '@/components/_AnimeDetailsBox';
import withContainer from '@/components/Container';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
// import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import { ExecuteQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Anime = ({
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
                <AnimeDetailsBox obj={details} />
            </aside>
        </div>
    );
};

Anime.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id:id }, getAnimeSummary(), (data, err) => { return data.result; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            image: image.ProfileAny(images),
        };
    });

    const genres = (data.genres || []).map(genre => {
        return genre.names[0].text;
    });

    const universe = data.partOfCanonicals?.partOfUniverses ? {
        id: data.partOfCanonicals.partOfUniverses.id,
        name: locale.EnglishAny(data.partOfCanonicals.partOfUniverses.names),
    } : undefined;

    return {
        type: 'Anime',
        description: locale.English(data.descriptions),
        characters: characters,
        canonicals: undefined, // TODO: data.partOfCanonicals
        id: data.id,
        details: {
            englishTitle: locale.English(data.names),
            japaneseTitle: locale.Japanese(data.names),
            romajiTitle: locale.Romaji(data.names),
            media: data.type,
            episodeCount: data.episodes?.length,
            status: data.status?.toLowerCase(),
            season: season.JapanAny(data.runnings),
            ageRating: AgeRating(data.ageRatings, ['USA']),
            genres,
            universe,
        }
    };
};

export default withContainer(Anime);
