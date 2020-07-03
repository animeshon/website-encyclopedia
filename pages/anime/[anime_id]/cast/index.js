import Link from 'next/link';
import { kebabCase, capitalize } from 'lodash';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import getAnimeCast from '@/queries/anime/Cast';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

const AnimeCast = ({
    anime_id,
    title,
    cover_image,
    hero_image,
    cast_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            anyTitle={title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={`${title} Cover`}
            heroImageAltText={`${title} Hero`}
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

AnimeCast.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const client = ctx.apolloClient;

    const raw_id = anime_id.substring(0, 16);

    const res = await client.query({
        query: getAnimeCast(raw_id),
    });

    const data = res.data.queryAnime[0];

    const titles = data ? data.names : []; // returns an array
    const cover_image = data ? data.images[0].image.file.publicUri : ''; // returns a string

    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const title = titles.filter(o => o.localization[0].id == 'en-US')[0].text; // returns a string

    // ***********************************************
    // ***********************************************
    // Skipped cause of missing data
    // ***********************************************
    // ***********************************************

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
        title,
        cover_image,
        hero_image,
        cast_full_list,
    };
};

export default AnimeCast;
