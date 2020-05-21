import Link from 'next/link';
import { kebabCase, capitalize } from 'lodash';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

const renderCast = items => {
    const linkTo = '/poeople/';
    return items.map(item => {
        const linkProps = {
            href: `${linkTo}[people_id]`,
            as: `${linkTo}${
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
                    <p className="card__role">
                        <span
                            className={`fp fp-sm custom-fp ${item.nationality.iso}`}
                        />
                        {capitalize(item.sex)}
                    </p>
                    <Button
                        className="cherry-red medium character-button-ref"
                        href={`${linkTo}[people_id]`}
                        as={`${linkTo}${item.id}_${kebabCase(
                            item.fname + '-' + item.lname,
                        )}`}
                        type="next-link"
                    >
                        <span className="character-image">
                            <img
                                src={item.character.picture}
                                alt={item.character.name}
                            />
                        </span>
                        <span className="character-name">
                            {item.character.name}
                        </span>
                    </Button>
                </div>
            </div>
        );
    });
};
const AnimeCast = ({
    anime_id,
    main_title,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    cast_full_list,
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
            selectedMenu="Cast"
        >
            <main className="anime-cast__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Cast</h3>
                    </header>
                    <div className="grid-halves">
                        {renderCast(cast_full_list)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

AnimeCast.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const main_title = 'Fate Kaleid Prisma Ilya';
    const cover_image_alt_text = 'Fate Kaleid Prisma Ilya Cover';
    const hero_image_alt_text = 'Fate Kaleid Prisma Ilya Hero';
    const cast_full_list = [
        {
            fname: 'Shizuka',
            lname: 'Itou',
            japanese_name: '静伊藤',
            character: {
                name: 'Luviagelita Edelfelt',
                picture:
                    'https://www.nautiljon.com/images/perso/00/35/luviagelita_edelfelt_12353.jpg',
            },
            sex: 'female',
            nationality: {
                extended: 'japan',
                iso: 'jp',
            },
            type: 'people',
            person_profession: 'voice-actor',
            profile_picture:
                'https://th.bing.com/th/id/OIP.KQLaDnjwz0qPYFGc5MOqUgHaId',
            id: 'KF6pueaGkhfXjvwHKQiSxY',
        },
        {
            fname: 'Shizuka',
            lname: 'Itou',
            japanese_name: '静伊藤',
            character: {
                name: 'Luviagelita Edelfelt',
                picture:
                    'https://www.nautiljon.com/images/perso/00/35/luviagelita_edelfelt_12353.jpg',
            },
            sex: 'female',
            nationality: {
                extended: 'japan',
                iso: 'jp',
            },
            type: 'people',
            person_profession: 'voice-actor',
            profile_picture:
                'https://th.bing.com/th/id/OIP.KQLaDnjwz0qPYFGc5MOqUgHaId',
            id: 'DZozVL4oVHN53s4dPMg9Pk',
        },
        {
            fname: 'Shizuka',
            lname: 'Itou',
            japanese_name: '静伊藤',
            character: {
                name: 'Luviagelita Edelfelt',
                picture:
                    'https://www.nautiljon.com/images/perso/00/35/luviagelita_edelfelt_12353.jpg',
            },
            sex: 'female',
            nationality: {
                extended: 'japan',
                iso: 'jp',
            },
            type: 'people',
            person_profession: 'voice-actor',
            profile_picture:
                'https://th.bing.com/th/id/OIP.KQLaDnjwz0qPYFGc5MOqUgHaId',
            id: 'MnUM7UvLwcxFdsUixnYrGN',
        },
        {
            fname: 'Shizuka',
            lname: 'Itou',
            japanese_name: '静伊藤',
            character: {
                name: 'Luviagelita Edelfelt',
                picture:
                    'https://www.nautiljon.com/images/perso/00/35/luviagelita_edelfelt_12353.jpg',
            },
            sex: 'female',
            nationality: {
                extended: 'japan',
                iso: 'jp',
            },
            type: 'people',
            person_profession: 'voice-actor',
            profile_picture:
                'https://th.bing.com/th/id/OIP.KQLaDnjwz0qPYFGc5MOqUgHaId',
            id: 'tK7nEDbD2abiYj6KYSQYdD',
        },
    ];

    return {
        anime_id,
        main_title,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        cast_full_list,
    };
};

export default AnimeCast;
