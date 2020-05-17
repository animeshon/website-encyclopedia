import Link from 'next/link';
import { kebabCase, replace } from 'lodash';

import AnyWrapper from '../../../AnyWrapper';
import { AnimeNavigation } from '../../../../resources/navigation/allTabNavigations';

import Button from '../../../../components/Button';
import CardImage from '../../../../components/Card/Image';

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

const AnimeCharacters = ({
    anime_id,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    characters_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={anime_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={AnimeNavigation}
            selectedMenu="Characters"
        >
            <main className="anime-characters__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Characters</h3>
                    </header>
                    <div className="grid-halves">
                        {renderCharacters(characters_full_list)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

AnimeCharacters.getInitialProps = async ctx => {
    const { anime_id } = ctx.query;
    const hero_image =
        'https://www.ricedigital.co.uk/wp-content/uploads/2016/01/Fatekaleid04D.jpgoriginal.jpg';
    const cover_image =
        'https://i2.wp.com/www.otakutale.com/wp-content/uploads/2017/10/Fate-kaleid-liner-Prisma-Illya-2017-Sequel-Anime-Visual.jpg';
    const cover_image_alt_text = 'Fate Kaleid Prisma Ilya Cover';
    const hero_image_alt_text = 'Fate Kaleid Prisma Ilya Hero';

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
        cover_image,
        hero_image,
        hero_image_alt_text,
        cover_image_alt_text,
        characters_full_list,
    };
};

export default AnimeCharacters;
