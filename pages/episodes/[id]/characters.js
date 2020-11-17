import Link from 'next/link';
import { kebabCase, replace } from 'lodash';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import {CardImageGender} from '@/components/Card/Image';

const renderCharacters = items => {
    const linkTo = '/characters/';
    return items.map(item => {
        const linkProps = {
            href: `${linkTo}[character_id]`,
            as: `/characters/${
                item.id + '_' + kebabCase(item.fname + '-' + item.lname)
            }`,
        };
        return (
            <div key={item.id} className="card">
                <Link {...linkProps}>
                    <a>
                        <CardImageGender
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
                        href={`${linkTo}[character_id]`}
                        as={`${linkTo}${item.id}_${kebabCase(
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

const EpisodeCharacters = ({
    anime_id,
    title,
    episode_id,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    characters_full_list,
}) => {
    return (
        <AnyWrapper
            id={anime_id}
            title={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
            anyNav={AnimeNavigation}
            selectedMenu="Characters"
        >
            <main className="anime-characters__description grid">
                <section className="landing-section-box">
                    <header className="header-w-back-button">
                        <Link
                            as={`/anime/${anime_id}/episodes/${episode_id}`}
                            href="/anime/[anime_id]/episodes/[episode_id]"
                        >
                            <a>&larr; Back</a>
                        </Link>
                        <h3>Characters Appearances</h3>
                    </header>
                    <div className="grid-halves">
                        {renderCharacters(characters_full_list)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

EpisodeCharacters.getInitialProps = async ctx => {
    const { anime_id, episode_id } = ctx.query;
    const profileImage =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const bannerImage =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const title = 'Fate Kaleid Prisma Ilya';
    const bannerImageAltText = 'Fate Kaleid Prisma Ilya Cover';
    const profileImageAltText = 'Fate Kaleid Prisma Ilya Hero';

    const characters_full_list = [
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

    return {
        anime_id,
        title,
        episode_id,
        bannerImage,
        profileImage,
        profileImageAltText,
        bannerImageAltText,
        characters_full_list,
    };
};

export default EpisodeCharacters;
