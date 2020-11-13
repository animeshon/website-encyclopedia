import Link from 'next/link';
import { truncate } from 'lodash';

import { undef } from '@/functions/undef';
import { localizer } from '@/functions/localizer';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import getAnimeEpisodes from '@/queries/anime/Episodes';

import AnyWrapper from '@/components/_AnyWrapper';

const AnimeEpisodes = ({
    anime_id,
    title,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    is_multiseason,
    episode_list,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
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
            bannerImage,
            excerpt,
            broadcast,
            id,
        } = item;

        const date = new Date();

        const date_human_readable = (new Date(broadcast)).toDateString();
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
                            <img src={bannerImage} alt={title_name} />
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

    const raw_id = anime_id.substring(0, 12);

    const res = await client.query({
        query: getAnimeEpisodes(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const bannerImage = data ? data.images[0].image.files[0].publicUri : ''; // returns a string
    const episodes = data ? data.episodes : [];

    const profileImage = ''; // TODO: Banner image not present

    const title = undef(localizer(titles, ['eng'], ['Latn'])); // returns a string
    const bannerImageAltText = title; // TODO: Better alt text for SEO.
    const profileImageAltText = title; // TODO: Better alt text for SEO.
    const is_multiseason = false; // TODO: Figure out how to detect this value.

    const episode_list = episodes
        .map(item => {
            const {
                id,
                index,
                videos,
                names,
                descriptions,
                images,
                broadcasts
            } = item;


            var length_minutes = '?';
            if (videos && videos[0]) {
                length_minutes = videos[0].video.duration;
            }

            return {
                title_name: undef(localizer(names, ['eng'], ['Latn']), ''),
                length_minutes,
                season_number: '1',
                espisode_number: index,
                bannerImage: images[0]
                    ? images[0].image.files[0].publicUri
                    : 'https://via.placeholder.com/270x160?text=Episode '+index,
                excerpt: undef(localizer(descriptions, ['eng'], ['Latn']), ''),
                broadcast: broadcasts[0] ? broadcasts[0].from : '',
                id,
            };
        })
        .filter(i => i !== undefined);
    
    episode_list.sort((a, b) => (parseInt(a.espisode_number) - parseInt(b.espisode_number)));

    return {
        anime_id,
        title,
        bannerImage,
        profileImage,
        bannerImageAltText,
        profileImageAltText,
        is_multiseason,
        episode_list,
    };
};

export default AnimeEpisodes;
