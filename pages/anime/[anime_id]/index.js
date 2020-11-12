import { useContext } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import replace from 'lodash/replace';
import kebabCase from 'lodash/kebabCase';

import { LanguageContext } from '@/ctx/languages';

import { undef } from '@/functions/undef';
import { localizer } from '@/functions/localizer';
import { monthSwitch } from '@/functions/monthSwitch';

import getAnimeSummary from '@/queries/anime/Summary';

import AnyWrapper from '@/components/_AnyWrapper';
import { AnimeDetailsBox } from '@/components/_AnimeDetailsBox';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';
import { fallbackLatinAny, fallbackScriptAny, withLocale } from 'utilities/localization';
import { withQuery } from 'utilities/query';
import { withImage, fallbackRegularAny } from 'utilities/image';

const Anime = ({
    anime_id,
    title,
    cover_image,
    hero_image,
    description,
    characters_list,
    anime_details,
}) => {
    const { language } = useContext(LanguageContext);

    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={`${title} Cover`}
            heroImageAltText={`${title} Hero`}
            anyNav={AnimeNavigation}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                {/*  */}
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p className="text_description">{parse(description)}</p>
                </section>
                {/* Characters */}
                {characters_list.length > 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Characters</h3>
                            <span />
                            {characters_list.length > 3 && (
                                <Link
                                    href="/anime/[anime_id]/characters"
                                    as={`/anime/${anime_id}/characters`}
                                >
                                    <a className="view-all-link">View all</a>
                                </Link>
                            )}
                        </header>
                        <ul className="characters-list">
                            {renderCharacters(characters_list)}
                        </ul>
                    </section>
                )}
                {/* Anime Timeline 
                <section className="landing-section-box">
                    <header>
                        <h3>Anime Timeline</h3>
                        <span />
                    </header>
                </section>
                */}
                {/* Adaptations
                {adaptations_list.length !== 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Adaptations</h3>
                            <span />
                            {adaptations_count > 4 && (
                                <Link href="" as="">
                                    <a className="view-all-link">View all</a>
                                </Link>
                            )}
                        </header>
                        <ul className="adaptations-list">
                            {renderAdaptations(adaptations_list)}
                        </ul>
                    </section>
                )}
                */}
                {/*  */}
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <AnimeDetailsBox obj={anime_details} />
            </aside>
        </AnyWrapper>
    );
};

const renderCharacters = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link
                href="/characters/[character_id]"
                as={`/characters/${item.id}_${kebabCase(`${item.name}`)}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.profilePic} />
                    </div>
                    <span>{item.name}</span>
                </a>
            </Link>
        </li>
    ));
};

// const renderAdaptations = items => {
//     return items.map(item => (
//         <li key={item.id}>
//             <Link
//                 href={`/${item.type}/[${item.type}_id]`}
//                 as={`/${item.type}/${item.id}_${kebabCase(item.product_name)}`}
//             >
//                 <a>
//                     <div className="cover">
//                         <img src={item.cover_url} />
//                     </div>
//                     <span>{replace(item.type, '-', ' ')}</span>
//                 </a>
//             </Link>
//         </li>
//     ));
// };

Anime.getInitialProps = async ctx => {
    const data = await withQuery(ctx, getAnimeSummary, function (data) { return data.queryAnime[0]; });

    const runnings = data ? data.runnings : []; // return an array

    const profileImage  = withImage(data.images, ['PROFILE'], ['PNG'], fallbackRegularAny);
    const coverImage    = withImage(data.images, ['COVER'], ['PNG']);

    const title         = withLocale(data.names, ['eng'], ['Latn'], [], fallbackLatinAny) || '(Missing title)';
    const description   = withLocale(data.descriptions, ['eng'], ['Latn']) || 'There is no description available in your language.';

    const englishTitle  = withLocale(data.names, ['eng'], ['Latn']) || '-';
    const romajiTitle   = withLocale(data.names, ['jpn'], ['Latn']) || '-';
    const japaneseTitle = withLocale(data.names, ['jpn'], ['Jpan']) || '-';

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: withLocale(names, [], ['Latn'], [], fallbackScriptAny) || '(Missing name)',
            profilePic: withImage(images, ['PROFILE'], ['PNG'], fallbackRegularAny),
        };
    });

    const genres = (data.genres || []).map(genre => {
        return genre.names[0].text;
    });

    const season_from = runnings[0]
        ? runnings[0].from.split('-')
        : undefined;
    const from_year = season_from ? season_from[0] : undefined;
    const from_month = season_from ? monthSwitch(season_from[1]) : undefined;
    const season_to = runnings[0]
        ? runnings[0].to.split('-')
        : undefined;
    const to_year = season_to ? season_to[0] : undefined;
    const to_month = season_to ? monthSwitch(season_to[1]) : undefined;

    const from_string = from_year
        ? `${to_year ? 'from ' : ''}${
              from_month ? `${from_month} ` : ''
          }${from_year}`
        : '';
    const to_string = to_year
        ? `\nto ${to_month ? `${to_month} ` : ''}${to_year}`
        : '';

    const season = from_string ? `${from_string}, ${to_string}` : '';

    const anime_details = {
        english_title: englishTitle,
        japanese_title: japaneseTitle,
        romaji_title: romajiTitle,
        media: undefined, // TODO: still not present on the graphql db
        episodes_number: data.episodes.length,
        status: data.status.toLowerCase(),
        season, // TODO: ?? in case we have a multiseason how we label it? In case we have a movie? 'Summer 2013'
        genres, // TODO: still not present on the graphql db
        age_rating: undefined, // TODO: still not present on the graphql db
        universe: undefined, // TODO: still not present on the graphql db
        universe_id: undefined, // TODO: still not present on the graphql db
    };

    return {
        anime_id: data.id,
        title,
        cover_image: profileImage,
        hero_image: coverImage,
        description,
        characters_list: characters,
        anime_details,
    };
};

export default Anime;
