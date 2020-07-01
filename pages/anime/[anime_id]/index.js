import { useContext } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import replace from 'lodash/replace';
import kebabCase from 'lodash/kebabCase';
import fetch from 'cross-fetch';

import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { LanguageContext } from '@/ctx/languages';

import AnyWrapper from '@/components/_AnyWrapper';
import { AnimeDetailsBox } from '@/components/_AnimeDetailsBox';

import getAnimeSummary from '@/queries/anime/Summary';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

const Anime = ({
    anime_id,
    titles,
    cover_image,
    hero_image,
    descriptions,
    characters_list,
    anime_details,
    adaptations_list,
    adaptations_count,
}) => {
    const { language } = useContext(LanguageContext);
    const finalTitle = titles.filter(o => o.localization[0].id != language);
    const finalDescription = descriptions.filter(
        o => o.localization[0].id != language,
    );
    // TODO waiting for the final version of data
    // for all of the things below
    const mainTitle = finalTitle[0] ? finalTitle[0].text : '';
    const mainDescription = finalDescription[0] ? finalDescription[0].text : '';

    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={mainTitle} // TODO: not definitive
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={`${mainTitle} Cover`}
            heroImageAltText={`${mainTitle} Hero illustration`}
            anyNav={AnimeNavigation}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                {/*  */}
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p>{parse(mainDescription)}</p> {/* TODO: not definitive */}
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
                as={`/characters/${item.id}_${kebabCase(
                    `${item.fname}-${item.lname}`,
                )}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.profilePic} />
                    </div>
                    <span>{item.fname}</span>
                </a>
            </Link>
        </li>
    ));
};

const renderAdaptations = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link
                href={`/${item.type}/[${item.type}_id]`}
                as={`/${item.type}/${item.id}_${kebabCase(item.product_name)}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.cover_url} />
                    </div>
                    <span>{replace(item.type, '-', ' ')}</span>
                </a>
            </Link>
        </li>
    ));
};

// Apollo
// **************************
const client = new ApolloClient({
    link: createHttpLink({
        uri: 'http://localhost:8080/graphql',
        fetch,
    }),
    cache: new InMemoryCache(),
});

Anime.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const raw_id = anime_id.substring(0, 16);

    const res = await client.query({
        query: getAnimeSummary(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const descriptions = data ? data.description : []; // returns an array
    const characters = data ? data.starring[0] : []; // ??

    console.log(titles);

    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const characters_count = 10;
    const characters_list = [
        {
            fname: 'Miyu',
            lname: 'Endefe',
            profilePic:
                'https://www.nautiljon.com/images/perso/00/25/miyu_edelfelt_12352.jpg',
            id: '8WZqW4hZMSmiucnKrTdai5',
        },
        {
            fname: 'Rin',
            lname: 'Endefe',
            profilePic:
                'https://th.bing.com/th/id/OIP.FpTXIz4zw8zYCEi9OsOckAAAAA?pid=Api&rs=1',
            id: 'm5akibjJM2UGGHNdi4aQX3',
        },
        {
            fname: 'Illya',
            lname: 'Endefe',

            profilePic:
                'https://th.bing.com/th/id/OIP.fh94YfP_58licslWVbJAMQHaHa?pid=Api&rs=1',
            id: 'y9g9z3N9Sxb58nGF2jmfqB',
        },
        {
            fname: 'Luviagelita',
            lname: 'Endefe',

            profilePic:
                'https://www.nautiljon.com/images/perso/00/35/luviagelita_edelfelt_12353.jpg',
            id: '3RnW4DLemcHdW2Job6xX2c',
        },
    ];

    const anime_details = {
        english_title: 'Fate/Kaleid Liner Prisma Illya',
        japanese_title: 'Fate/kaleid liner プリズマ☆イリヤ',
        romaji_title: 'Fate/kaleid liner PURIZUMA☆IRIYA',
        media: 'TV',
        episodes_number: 10,
        status: 'Finished',
        season: 'Summer 2013',
        genres: ['Action Comedy', 'Drama', 'Supernatural'],
        age_rating: 'R-18+',
        universe: 'Fate',
        universe_id: 'GMhRhdA7urRsLQPXj6XWiB',
    };

    return {
        anime_id,
        titles,
        cover_image,
        hero_image,
        descriptions,
        characters_count,
        characters_list,
        anime_details,
    };
};

export default Anime;
