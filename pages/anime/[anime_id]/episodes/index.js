import Link from 'next/link';
import { truncate } from 'lodash';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import getAnimeEpisodes from '@/queries/anime/Episodes';

import AnyWrapper from '@/components/_AnyWrapper';

const AnimeEpisodes = ({
    anime_id,
    main_title,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    is_multiseason,
    episode_list,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={main_title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={AnimeNavigation}
            selectedMenu="Episodes"
        >
            <main className="anime-episodes__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Episodes</h3>
                    </header>
                    <div className="episodes-list">
                        {renderEpisodes(episode_list, is_multiseason, anime_id)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

const renderEpisodes = (items, isMultiSeason, anime_id) => {
    return items.map(item => {
        const {
            title_name,
            length_minutes,
            season_number,
            espisode_number,
            cover_image,
            excerpt,
            id,
        } = item;

        const date = new Date();

        const date_human_readable = date.toDateString();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const datetime = `${year}-${month}-${day}`;

        const linkProps = {
            href: '/anime/[anime_id]/episodes/[episode_id]',
            as: `/anime/${anime_id}/episodes/${id}`,
        };
        return (
            <div key={id} className="episodes-list__box">
                <Link {...linkProps}>
                    <a>
                        <figure className="episodes-list__image">
                            <img src={cover_image} alt={title_name} />
                        </figure>
                    </a>
                </Link>
                <div className="episode-details">
                    <div className="episode-details__season-episode">
                        {isMultiSeason && [
                            <span>Season {season_number}</span>,
                            ' / ',
                        ]}
                        Episode {espisode_number}
                    </div>
                    <Link {...linkProps}>
                        <a>
                            <h4>{title_name}</h4>
                        </a>
                    </Link>
                    <p className="episode-details__length-date">
                        <span>{length_minutes} minutes</span>
                        {' - '}
                        <time dateTime={datetime}>{date_human_readable}</time>
                    </p>
                    <p className="episode-details__description">
                        {truncate(excerpt, {
                            length: 240,
                            omission: ' ...',
                        })}
                    </p>
                </div>
            </div>
        );
    });
};

AnimeEpisodes.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const client = ctx.apolloClient;

    const raw_id = anime_id.substring(0, 16);

    const res = await client.query({
        query: getAnimeEpisodes(raw_id),
    });

    const data = res.data.queryAnime[0];

    // DEBUG: console.log(`${'+'.repeat(120)} EPISODES ${'+'.repeat(120)} \n`, data);

    const hero_image = ''; // TODO: Banner image not present

    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const main_title = 'Fate/Kaleid Liner Prisma Illya';
    const cover_image_alt_text = 'Fate Kaleid Prisma Ilya Cover';
    const hero_image_alt_text = 'Fate Kaleid Prisma Ilya Hero';
    const is_multiseason = false;
    const episode_list = [
        {
            title_name: 'Birth! A Magical Girl',
            length_minutes: '24',
            season_number: '1',
            espisode_number: '1',
            cover_image:
                'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
            excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
            id: 'ADS2Z8pXhxd96xNVXQSc9X',
        },
        {
            title_name: 'Birth! A Magical Girl',
            length_minutes: '24',
            season_number: '1',
            espisode_number: '2',
            cover_image:
                'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
            excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
            id: 'bBrhDVT3HC3BywqCAgW2Qk',
        },
        {
            title_name: 'Birth! A Magical Girl',
            length_minutes: '24',
            season_number: '1',
            espisode_number: '2',
            cover_image:
                'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
            excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
            id: 'ZLbqjMsG8NDWp79gPMkCYK',
        },
        {
            title_name: 'Birth! A Magical Girl',
            length_minutes: '24',
            season_number: '1',
            espisode_number: '2',
            cover_image:
                'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
            excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
            id: 'ayPdPVBSCayw9vPUb6NHnE',
        },
        {
            title_name: 'Birth! A Magical Girl',
            length_minutes: '24',
            season_number: '1',
            espisode_number: '2',
            cover_image:
                'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
            excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
            id: 'KrU4SWCvCbQF6MLAWBcPCn',
        },
        {
            title_name: 'Birth! A Magical Girl',
            length_minutes: '24',
            season_number: '1',
            espisode_number: '2',
            cover_image:
                'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
            excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
            id: 'GUEfU7Qx8C3zWChfu9xreM',
        },
    ];

    return {
        anime_id,
        main_title,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        is_multiseason,
        episode_list,
    };
};

export default AnimeEpisodes;
