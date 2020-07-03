import { useContext } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import replace from 'lodash/replace';
import kebabCase from 'lodash/kebabCase';

import { LanguageContext } from '@/ctx/languages';

import AnyWrapper from '@/components/_AnyWrapper';
import { AnimeDetailsBox } from '@/components/_AnimeDetailsBox';

import getAnimeSummary from '@/queries/anime/Summary';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

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
            anyTitle={title} // TODO: not definitive
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
    // const langauge = ctx.req.headers['accept-language'].split(',')[0];
    // const isoLang = langauge != 'ja_JP' ? 'en-US' : 'ja-JP';

    const { anime_id } = ctx.query;
    const raw_id = anime_id.substring(0, 16);
    const client = ctx.apolloClient;

    const res = await client.query({
        query: getAnimeSummary(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const descriptions = data ? data.description : []; // returns an array
    const characters = data ? data.starring : []; // returns an array
    const cover_image = data ? data.images[0].image.file.publicUri : '';

    const description = descriptions.filter(
        o => o.localization[0].id == 'en-US',
    )[0].text; // returns a string

    const english_title = titles.filter(o => o.localization[0].id == 'en-US')[0]
        .text; // returns a string

    const title = english_title;

    const japanese_title = titles.filter(
        o => o.localization[0].id === 'ja-JP',
    )[0].text; // returns a string

    // extract the characters
    const characters_list = characters.map(char => {
        const { id, images, names } = char.character;
        return {
            name: names[0].text,
            profilePic: images[0].image.file.publicUri,
            id,
        };
    });

    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';

    const anime_details = {
        english_title,
        japanese_title,
        romaji_title: undefined, // TODO: still not present on the graphql db
        media: undefined, // TODO: still not present on the graphql db
        episodes_number: data.episodes.length,
        status: data.status.toLowerCase(),
        season: undefined, // TODO: ?? in case we have a multiseason how we label it? In case we have a movie? 'Summer 2013'
        genres: undefined, // TODO: still not present on the graphql db
        age_rating: undefined, // TODO: still not present on the graphql db
        universe: undefined, // TODO: still not present on the graphql db
        universe_id: undefined, // TODO: still not present on the graphql db
    };

    return {
        anime_id,
        title,
        cover_image,
        hero_image,
        description,
        characters_list,
        anime_details,
    };
};

export default Anime;
