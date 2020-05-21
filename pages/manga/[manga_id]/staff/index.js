import Link from 'next/link';
import { useState, useEffect } from 'react';
import { replace, kebabCase, capitalize } from 'lodash';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

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

const AnimeStaff = ({
    manga_id,
    main_title,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
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
            anyId={manga_id}
            anyTitle={main_title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={MangaNavigation}
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

AnimeStaff.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;
    const hero_image =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const cover_image = 'https://m.media-amazon.com/images/I/51B5wtc70mL.jpg';
    const main_title = "Komi Can't Communicate";
    const cover_image_alt_text = "Komi Can't Communicate Cover";
    const hero_image_alt_text = "Komi Can't Communicate Hero";

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
        manga_id,
        main_title,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        staff_full_list,
    };
};

export default AnimeStaff;
