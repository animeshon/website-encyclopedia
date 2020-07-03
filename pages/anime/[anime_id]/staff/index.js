import Link from 'next/link';
import { useState, useEffect } from 'react';
import { replace, kebabCase, capitalize } from 'lodash';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import getAnimeStaff from '@/queries/anime/Staff';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

const AnimeStaff = ({
    anime_id,
    title,
    cover_image,
    hero_image,
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
    }, [setSection]);

    const openSection = (e, val) => {
        setSection({
            ...openedSection,
            [e.currentTarget.name]: !val,
        });
    };

    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={`${title} Cover`}
            heroImageAltText={`${title} Hero`}
            anyNav={AnimeNavigation}
            selectedMenu="Staff"
        >
            <main className="anime-staff__description grid">
                <div className="landing-section-box">
                    <header>
                        <h3>Staff</h3>
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
                                        i.id + '_' + kebabCase(i.name)
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
                                                    altText={`${i.name} Profile Picture`}
                                                />
                                            </a>
                                        </Link>

                                        <div className="card__info">
                                            <Link {...linkProps}>
                                                <a>
                                                    <h4>{i.name}</h4>
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
                                                type="next-link"
                                                {...linkProps}
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

AnimeStaff.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const client = ctx.apolloClient;

    const raw_id = anime_id.substring(0, 16);

    const res = await client.query({
        query: getAnimeStaff(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const cover_image = data ? data.images[0].image.file.publicUri : ''; // returns a string
    const staff = data ? data.staff : '';

    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const title = titles.filter(o => o.localization[0].id == 'en-US')[0].text; // returns a string

    // ***********************************************
    // ***********************************************
    // Skipped cause of missing key field 'role'
    // ***********************************************
    // ***********************************************

    const staff_full_list = [
        {
            original_work: [
                {
                    name: 'Hiroyama Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKf7SXSasdasdasdsPXn',
                    picture: '',
                },
                {
                    name: 'Hiroyama Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKfsdfsdf7SXSsPXn',
                    picture: '',
                },
                {
                    name: 'Hiroyama Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKf7dfgdfSXSsPXn',
                    picture: '',
                },
            ],
            chief_direction: [
                {
                    name: 'Hiroyama Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'female',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKfghfgf7SXSsPXn',
                    picture: '',
                },
            ],
            direction: [
                {
                    name: 'Hiroyama Hiroshi',
                    japanese_name: 'ひろやまひろし',
                    sex: 'male',
                    nationality: {
                        extended: 'japan',
                        iso: 'jp',
                    },
                    type: 'people',
                    person_role: 'Orignial Work',
                    id: 'Ypbh7y2ivfjHKhjkhjkf7SXSsPXn',
                    picture: '',
                },
            ],
        },
    ];

    return {
        anime_id,
        title,
        cover_image,
        hero_image,
        staff_full_list,
    };
};

export default AnimeStaff;
