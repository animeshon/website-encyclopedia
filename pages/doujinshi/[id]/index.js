import React from 'react';

import getDoujinshiSummary from '@/queries/doujinshi/Summary';

import { MangaDetailsBox } from '@/components/_MangaDetailsBox';
import Container from '@/components/Container';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
// import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';

import { DoujinshiNavigation } from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Doujinshi = ({
    type,
    container,
    title,
    description,
    characters,
    details,
    canonicals,
}) => {
    return (
        <Container container={container}>
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryCharacter id={container.id} type={type} title={title} characters={characters} />
                {/* <SummaryTimeline /> */}
                <SummaryCanonical id={container.id} title={title} canonicals={canonicals} />
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <MangaDetailsBox obj={details} pageType="manga-landing" />
            </aside>
        </Container>
    );
};

Doujinshi.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, id, getDoujinshiSummary, function (data) { return data.queryDoujinshi[0]; });

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
        type: 'Doujinshi',
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
        },
        container: {
            id: data.id,
            title: locale.EnglishAny(data.names),
            bannerImage: image.ProfileAny(data.images),
            profileImage: image.Cover(data.images),
            navigation: DoujinshiNavigation(data.id),
            selected: "Summary"
        },
    };
};

export default Doujinshi;
