import Link from 'next/link';
import { kebabCase, replace, capitalize } from 'lodash';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

const renderStaff = (items, openSection, actionSection) => {
    return items.map(item => {
        let arrayOfSections = [];
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                arrayOfSections.push(
                    <section key={key} className="expandable-section">
                        <h4>
                            <button>
                                <span className="label">
                                    {replace(key, '_', ' ')}
                                </span>
                                <span className="line wide" />
                            </button>
                        </h4>
                        <div className="staff-members-holder opened">
                            {item[key].map(i => {
                                const linkProps = {
                                    href: '/people/[people_id]',
                                    as: `/people/${
                                        i.id +
                                        '_' +
                                        kebabCase(i.fname + '-' + i.lname)
                                    }`,
                                };
                                return (
                                    <div key={i.id} className="card">
                                        <Link {...linkProps}>
                                            <a>
                                                <CardImage
                                                    type={i.type}
                                                    sex={i.sex}
                                                    picture={i.profilePic}
                                                    altText={`${i.fname} ${i.lname}`}
                                                />
                                            </a>
                                        </Link>

                                        <div className="card__info">
                                            <Link {...linkProps}>
                                                <a>
                                                    <h4>
                                                        {i.fname} {i.lname}
                                                    </h4>
                                                </a>
                                            </Link>
                                            <p className="card__jap-name">
                                                {i.japanese_name}
                                            </p>
                                            <p className="card__role">
                                                <span
                                                    className={`fp fp-sm custom-fp ${i.nationality.iso}`}
                                                />
                                                {capitalize(i.sex)}
                                            </p>
                                            <Button
                                                className="cherry-red medium"
                                                href="/people/[people_id]"
                                                as={`/people/${
                                                    i.id
                                                }_${kebabCase(
                                                    `${i.fname}-${i.lname}`,
                                                )}`}
                                                type="next-link"
                                            >
                                                More
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>,
                );
            }
        }
        return arrayOfSections;
    });
};

const renderCharacters = items => {
    return items.map(item => {
        const linkProps = {
            href: '/characters/[character_id]',
            as: `/characters/${
                item.id + '_' + kebabCase(item.fname + '-' + item.lname)
            }`,
        };

        return (
            <div key={item.id} className="card">
                <Link {...linkProps}>
                    <a>
                        <CardImage
                            type={item.type}
                            sex={item.sex}
                            picture={item.profile_picture}
                            altText={`${item.fname} ${item.lname}`}
                        />
                    </a>
                </Link>

                <div className="card__info">
                    <Link {...linkProps}>
                        <a>
                            <h4>
                                {item.fname} {item.lname}
                            </h4>
                        </a>
                    </Link>
                    <p className="card__jap-name">{item.japanese_name}</p>
                    <p className="card__role">{replace(item.role, '-', ' ')}</p>
                    <Button
                        className="cherry-red medium"
                        href="/characters/[character_id]"
                        as={`/characters/${item.id}_${kebabCase(
                            `${item.fname}-${item.lname}`,
                        )}`}
                        type="next-link"
                    >
                        More
                    </Button>
                </div>
            </div>
        );
    });
};

const renderEpisode = (item, isMultiSeason) => {
    const {
        title_name,
        length_minutes,
        season_number,
        espisode_number,
        bannerImage,
        excerpt,
        id,
    } = item;

    const date = new Date();

    const date_human_readable = date.toDateString();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const datetime = `${year}-${month}-${day}`;

    return (
        <div key={id} className="episode__box">
            <a>
                <figure className="episode__image">
                    <img src={bannerImage} alt={title_name} />
                </figure>
            </a>
            <div className="episode-details">
                <div className="episode-details__season-episode">
                    {isMultiSeason && [
                        <span>Season {season_number}</span>,
                        ' / ',
                    ]}
                    Episode {espisode_number}
                </div>
                <a>
                    <h4>{title_name}</h4>
                </a>
                <p className="episode-details__length-date">
                    <span>{length_minutes} minutes</span>
                    {' - '}
                    <time dateTime={datetime}>{date_human_readable}</time>
                </p>
                <p className="episode-details__description">{excerpt}</p>
            </div>
        </div>
    );
};

const renderWatchLinks = links => {
    return links.map(link => {
        const country = 'us';
        return (
            <a
                key={link.platform}
                className="external-platform-button"
                href={link.links[country]}
                target="_blank"
            >
                <img src={link.image} alt={link.platform} />
            </a>
        );
    });
};

const AnimeEpisode = ({
    anime_id,
    title,
    episode_id,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    is_multiseason,
    episode_details,
    songs_list,
    characters_appearence_list,
    staff_list,
    watch_list,
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
            <main className="anime-episode__description single-episode grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Episode: Birth! A Magical Girl!</h3>
                    </header>
                    <div className="episodes-list">
                        {renderEpisode(episode_details, is_multiseason)}
                    </div>
                </section>
                {songs_list.length !== 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h4>Songs</h4>
                            <span />
                        </header>
                    </section>
                )}
                <section className="landing-section-box watch-links">
                    <header>
                        <h4>Watch on</h4>
                        <span />
                    </header>
                    {watch_list.length !== 0 ? (
                        <div className="grid-halves">
                            {renderWatchLinks(watch_list)}
                        </div>
                    ) : (
                        <div className="no-links-available">
                            We haven't found any source
                        </div>
                    )}
                </section>

                {characters_appearence_list.length !== 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h4>Characters</h4>
                            <span />
                            {characters_appearence_list.length > 3 && (
                                <Link
                                    href="/anime/[anime_id]/episodes/[episode_id]/characters"
                                    as={`/anime/${anime_id}/episodes/${episode_id}/characters`}
                                >
                                    <a className="view-all-link">View all</a>
                                </Link>
                            )}
                        </header>
                        <div className="grid-halves">
                            {renderCharacters(characters_appearence_list)}
                        </div>
                    </section>
                )}
                <section className="landing-section-box">
                    <header>
                        <h4>Staff</h4>
                        <span />
                        <Link
                            href="/anime/[anime_id]/episodes/[episode_id]/staff"
                            as={`/anime/${anime_id}/episodes/${episode_id}/staff`}
                        >
                            <a className="view-all-link">View all</a>
                        </Link>
                    </header>
                    <div className="grid-halves">{renderStaff(staff_list)}</div>
                </section>
            </main>
        </AnyWrapper>
    );
};

AnimeEpisode.getInitialProps = async ctx => {
    const { anime_id, episode_id } = ctx.query;
    const profileImage =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const bannerImage =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const title = 'Fate Kaleid Prisma Ilya';
    const bannerImageAltText = 'Fate Kaleid Prisma Ilya Cover';
    const profileImageAltText = 'Fate Kaleid Prisma Ilya Hero';
    const is_multiseason = false;
    const episode_details = {
        title_name: 'Birth! A Magical Girl',
        length_minutes: '24',
        season_number: '1',
        espisode_number: '3',
        bannerImage:
            'https://lh6.googleusercontent.com/-BwqNtkkdyQE/Uj9_b523mkI/AAAAAAAALZ4/DqZWDch4W0E/s800/Screen%2520shot%25202013-09-06%2520at%252012.49.14%2520PM.png',
        excerpt: `Illyasviel Von Einzbern, or Illya for short, is an ordinary girl living in Fuyuki City. One day, while she’s taking her bath at night, a suspicious magical stick, “Magical Ruby” suddenly flies in, and tries to tempt Illya into becoming a magical girl…?!`,
        id: 'ZLbqjMsG8NDWp79gPMkCYK',
    };
    const songs_list = [];
    const characters_appearence_list = [
        {
            fname: 'Miyu',
            lname: 'Edelfelt',
            role: 'main-character',
            japanese_name: '美遊・エーデルフェルト',
            sex: 'female',
            type: 'character',
            profile_picture:
                'https://www.nautiljon.com/images/perso/00/25/miyu_edelfelt_12352.jpg',
            id: '8WZqW4hZMSmiucnKrTdai5',
        },
        {
            fname: 'Rin',
            lname: 'Toosaka',
            role: 'main-character',
            japanese_name: '遠坂 凛',
            sex: 'female',
            type: 'character',
            profile_picture:
                'https://th.bing.com/th/id/OIP.FpTXIz4zw8zYCEi9OsOckAAAAA?pid=Api&rs=1',
            id: 'm5akibjJM2UGGHNdi4aQX3',
        },
        {
            fname: 'Illya',
            lname: 'von Einzbern',
            role: 'main-character',
            japanese_name: 'イリヤスフィール・フォン・アイン',
            sex: 'female',
            type: 'character',
            profile_picture:
                'https://th.bing.com/th/id/OIP.fh94YfP_58licslWVbJAMQHaHa?pid=Api&rs=1',
            id: 'y9g9z3N9Sxb58nGF2jmfqB',
        },
        {
            fname: 'Luviagelita',
            lname: 'Edelfelt',
            role: 'main-character',
            japanese_name: 'ルヴィアゼリッタ・エーデルフェルト',
            sex: 'female',
            type: 'character',
            profile_picture:
                'https://www.nautiljon.com/images/perso/00/35/luviagelita_edelfelt_12353.jpg',
            id: '3RnW4DLemcHdW2Job6xX2c',
        },
    ];

    const staff_list = [
        {
            original_work: [
                {
                    fname: 'Hiroyama',
                    lname: 'Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKf7SXSsPXn',
                    picture: '',
                },
            ],
            chief_direction: [
                {
                    fname: 'Hiroyama',
                    lname: 'Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'female',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHK7SXSsPXn',
                    picture: '',
                },
                {
                    fname: 'Hiroyama',
                    lname: 'Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'female',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfHKf7SXSsPXn',
                    picture: '',
                },
                {
                    fname: 'Hiroyama',
                    lname: 'Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'female',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKf7SXSsPXn',
                    picture: '',
                },
            ],
            direction: [
                {
                    fname: 'Hiroyama',
                    lname: 'Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKf7SXSsPXn',
                    picture: '',
                },
            ],
            character_design: [
                {
                    fname: 'Hiroyama',
                    lname: 'Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKfSsPXn',
                    picture: '',
                },
            ],
        },
    ];

    const watch_list = [
        {
            platform: 'Netflix',
            image: '/images/platform-netflix.png',
            links: {
                us: 'https://netflix.com/2879216347456/episode-1',
                de: 'https://netflix.com/de/96759817058/episode-1',
                it: 'https://netflix.com/it/15451534676/episode-1',
            },
        },
        {
            platform: 'Hulu',
            image: '/images/platform-hulu.png',
            links: {
                us: 'https://hulu.com/2879216347456/episode-1',
                de: 'https://hulu.com/de/96759817058/episode-1',
                it: 'https://hulu.com/it/15451534676/episode-1',
            },
        },
        {
            platform: 'Crunchyroll',
            image: '/images/platform-crunchyroll.png',
            links: {
                us: 'https://crunchyroll.com/2879216347456/episode-1',
                de: 'https://crunchyroll.com/de/96759817058/episode-1',
                it: 'https://crunchyroll.com/it/15451534676/episode-1',
            },
        },
    ];

    return {
        anime_id,
        title,
        episode_id,
        bannerImage,
        profileImage,
        bannerImageAltText,
        profileImageAltText,
        is_multiseason,
        episode_details,
        songs_list,
        characters_appearence_list,
        staff_list,
        watch_list,
    };
};

export default AnimeEpisode;
