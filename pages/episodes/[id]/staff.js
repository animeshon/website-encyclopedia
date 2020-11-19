import Link from 'next/link';
import { useState, useEffect } from 'react';
import { replace, kebabCase, capitalize } from 'lodash';

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
                            <button
                                name={key}
                                onClick={e =>
                                    actionSection(e, openSection[key])
                                }
                            >
                                <span className="label">
                                    {replace(key, '_', ' ')}
                                </span>
                                <span className="line" />
                                <span
                                    className={`toggler ${
                                        openSection[key] ? 'opened' : 'closed'
                                    }`}
                                ></span>
                            </button>
                        </h4>
                        <div
                            className={`staff-members-holder ${
                                openSection[key] ? 'opened' : 'closed'
                            }`}
                        >
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

const AnimeEpisodeStaff = ({
    anime_id,
    title,
    episode_id,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    staff_full_list,
}) => {
    const [openedSection, setSection] = useState({});

    useEffect(() => {
        let count = 0;
        let state = {};
        staff_full_list.map(item => {
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    state = {
                        ...state,
                        [key]: count === 0 || count === 1 ? true : false,
                    };
                }
                count++;
            }
            setSection(state);
        });
    }, []);

    const openSection = (e, val) => {
        setSection({
            ...openedSection,
            [e.currentTarget.name]: !val,
        });
    };

    return (
        <AnyWrapper
            id={anime_id}
            title={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
            anyNav={AnimeNavigation}
            selectedMenu="Staff"
        >
            <main className="anime-staff__description grid">
                <div className="landing-section-box">
                    <header className="header-w-back-button">
                        <Link
                            as={`/anime/${anime_id}/episodes/${episode_id}`}
                            href="/anime/[anime_id]/episodes/[episode_id]"
                        >
                            <a>&larr; Back</a>
                        </Link>
                        <h3>Episode's Staff</h3>
                    </header>
                    <div className="grid-halves">
                        {renderStaff(
                            staff_full_list,
                            openedSection,
                            openSection,
                        )}
                    </div>
                </div>
            </main>
        </AnyWrapper>
    );
};

AnimeEpisodeStaff.getInitialProps = async ctx => {
    const { anime_id, episode_id } = ctx.query;
    const profileImage =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const bannerImage =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const title = 'Fate Kaleid Prisma Ilya';
    const bannerImageAltText = 'Fate Kaleid Prisma Ilya Cover';
    const profileImageAltText = 'Fate Kaleid Prisma Ilya Hero';
    const staff_full_list = [
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
        staff_full_list,
    };
};

export default AnimeEpisodeStaff;
