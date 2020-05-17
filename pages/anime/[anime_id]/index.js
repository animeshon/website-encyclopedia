// libraries imports
import Link from 'next/link';
import parse from 'html-react-parser';
import { kebabCase, replace } from 'lodash';

// custom components
import AnyWrapper from '../../AnyWrapper';
import { AnimeDetailsBox } from '../../../components/_AnimeDetailsBox';

// anime tab navigation
import { AnimeNavigation } from '../../../resources/navigation/allTabNavigations';

// helper functions
import { stringSlugger } from '../../../helpers/stringSlugger';

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
                as={`/${item.type}/${item.id}_${stringSlugger(
                    item.product_name,
                )}`}
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

const Anime = ({
    anime_id,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    summary_description,
    characters_list,
    characters_count,
    anime_details,
    adaptations_list,
    adaptations_count,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={AnimeNavigation}
            selectedMenu="Summary"
        >
            <main className="anime-landing__description">
                {/*  */}
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p>{parse(summary_description)}</p>
                </section>
                {/* Characters */}
                <section className="landing-section-box">
                    <header>
                        <h3>Characters</h3>
                        <span />
                        {characters_count > 4 && (
                            <Link href="" as="">
                                <a>View all</a>
                            </Link>
                        )}
                    </header>
                    <ul className="characters-list">
                        {renderCharacters(characters_list)}
                    </ul>
                </section>
                {/* Anime Timeline */}
                <section className="landing-section-box">
                    <header>
                        <h3>Anime Timeline</h3>
                        <span />
                    </header>
                </section>
                {/* Adaptations */}
                <section className="landing-section-box">
                    <header>
                        <h3>Adaptations</h3>
                        <span />
                        {adaptations_count > 4 && (
                            <Link href="" as="">
                                <a>View all</a>
                            </Link>
                        )}
                    </header>
                    <ul className="adaptations-list">
                        {renderAdaptations(adaptations_list)}
                    </ul>
                </section>
                {/*  */}
            </main>
            <aside className="anime-landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <AnimeDetailsBox obj={anime_details} />
            </aside>
            <style jsx>{`
                .anime-landing__details {
                    width: 260px;
                    min-width: 260px;
                    margin-left: 35px;
                    min-height: 120px;
                    height: min-content;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 15px;
                }

                @media screen and (max-width: 1024px) {
                    .anime-landing__details {
                        align-self: center;
                        width: 100%;
                        max-width: 500px;
                        margin: 0;
                    }
                }
            `}</style>
        </AnyWrapper>
    );
};

Anime.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const cover_image_alt_text = 'Fate Kaleid Prisma Ilya Cover';
    const hero_image_alt_text = 'Fate Kaleid Prisma Ilya Hero';
    const summary_description = `Toosaka Rin and Luviagelita Edelfelt are magi from the Clock Tower,
    the headquarters of the Mage’s Association, and they were sent to Fuyuki City by its director
    to collect Class Cards, each holding the powers of a Servant from the Holy Grail War. To aid in
    their quest, they were handed two powerful magic wands, Rin receiving Magical Ruby and Luvia
    taking Magical Sapphire.<br/><br/>However, due to the two girls’ inability to get along, the wands got
    fed up with them and broke their contract. Ruby then sought a new master, and found one in an
    unsuspecting school girl by the name of Illyasviel von Einzbern. Despite Illya’s protests, Ruby
    insisted in making a magical girl out of her, and she is now Prisma Illya. With no knowledge in
    magecraft and no previous training of her own, being in fact a completely normal young girl with no
    outstanding abilities, now she must collect the powerful Class Cards using whatever limited aid Rin can
    give her. Will the two at least to enter a truce with Luvia and Sapphire’s new master and work together
    for this goal?`;
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
    const adaptations_count = 5;
    const adaptations_list = [
        {
            type: 'manga',
            product_name: 'Fate Kaleid Prisma Illya Ein',
            cover_url:
                'https://static.zerochan.net/Prisma.Illya.full.1905008.jpg',
            id: 'bRC8n6bmmC6RZYuuj2eNXf',
        },
        {
            type: 'light-novel',
            product_name: 'Fate Kaleid Prisma Illya Zwei',
            cover_url:
                'https://static.comicvine.com/uploads/scale_large/6/67663/6541531-10.jpg',
            id: '2Wn2bTqxekDpHwej7ABXF6',
        },
        {
            type: 'game',
            product_name: 'Fate Kaleid Prisma Illya Drei',
            cover_url:
                'https://vignette.wikia.nocookie.net/typemoon/images/9/97/Fate_kaleid_liner_Prisma_Illya_Manga_Vol_1_Cover.jpg',
            id: 'LzP22Ybg5tT2fDmXNzTwLm',
        },
        {
            type: 'visual-novel',
            product_name: 'Fate Kaleid Prisma Illya Viel',
            cover_url:
                'https://4.bp.blogspot.com/-kSMiSZkesX4/W5We9c0HvjI/AAAAAAAAAHs/CU0kQMrNdVEJRxBFEIWKfiAbW4_qJxVTgCLcBGAs/s1600/Fate_kaleid_liner_Prisma_Illya_Drei_Manga_Vol_9_Cover.jpg',
            id: 'AwqrPSQQbLX8b8iwyeDhnf',
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
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        summary_description,
        characters_count,
        characters_list,
        anime_details,
        adaptations_count,
        adaptations_list,
    };
};

export default Anime;
