import React from 'react';

import getMangaSummary from '@/queries/manga/Summary';

import { MangaDetailsBox } from '@/components/_MangaDetailsBox';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
// import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';

import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Manga = ({
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
                <MangaDetailsBox obj={details} pageType="manga-landing" />
            </aside>
        </div>
    );
};

Manga.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id:id }, getMangaSummary(), (data, err) => { return data.result; });

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
        type: 'Manga',
        id: data.id,
        description: locale.English(data.descriptions),
        characters: characters,
        canonicals: undefined, // TODO: data.partOfCanonicals
        details: {
            englishTitle:       locale.English(data.names),
            japaneseTitle:      locale.Japanese(data.names),
            romajiTitle:        locale.Romaji(data.names),
            media:              data.type,
            chapterCount:       data.chapters?.length,
            volumeCount:        data.volumes?.length,
            status:             data.status?.toLowerCase(),
            date_start:         undefined, // TODO
            date_end:           undefined, // TODO
            ageRating:          AgeRating(data.ageRatings, ['USA']),
            genres,
            universe,
        }
    };
};

export default withContainer(Manga);
