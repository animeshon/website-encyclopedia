import { useContext } from 'react';

import { LanguageContext } from '@/ctx/languages';

import getAnimeSummary from '@/queries/anime/Summary';

import { AnimeDetailsBox } from '@/components/_AnimeDetailsBox';
import Container from '@/components/Container';
import SummaryText from '@/components/SummaryText';
import SummaryCharacter from '@/components/SummaryCharacter';
import SummaryTimeline from '@/components/SummaryTimeline';
import SummaryCanonical from '@/components/SummaryCanonical';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import { ExecuteQuery } from '@/utilities/Query';
import { AgeRating } from '@/utilities/AgeRating';

const Anime = ({
    type,
    container,
    title,
    description,
    characters,
    details,
    canonicals,
}) => {
    const { language } = useContext(LanguageContext);

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
                <AnimeDetailsBox obj={details} />
            </aside>
        </Container>
    );
};

Anime.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, id, getAnimeSummary, (data) => { return data.queryAnime[0]; });

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
        },
        container: {
            id: data.id,
            title: locale.EnglishAny(data.names),
            bannerImage: image.ProfileAny(data.images),
            profileImage: image.Cover(data.images),
            navigation: AnimeNavigation(data.id),
            selected: "Summary"
        },
    };
};

export default Anime;
