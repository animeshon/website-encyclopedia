import Link from 'next/link';
import { kebabCase, replace } from 'lodash';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';
import CardImage from '@/components/Card/Image';

const renderCharacters = items => {
    const linkTo = '/characters/';
    return items.map(item => {
        const linkProps = {
            href: `${linkTo}[character_id]`,
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

const MangaCharacters = ({
    manga_id,
    main_title,
    bannerImage,
    profileImage,
    cover_image_alt_text,
    hero_image_alt_text,
    characters_full_list,
}) => {
    return (
        <AnyWrapper
            anyId={manga_id}
            anyTitle={main_title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={MangaNavigation}
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

MangaCharacters.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;
    const profileImage =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const bannerImage = 'https://m.media-amazon.com/images/I/51B5wtc70mL.jpg';
    const main_title = "Komi Can't Communicate";
    const cover_image_alt_text = "Komi Can't Communicate Cover";
    const hero_image_alt_text = "Komi Can't Communicate Hero";

    const characters_full_list = [
        {
            fname: 'Shouko',
            lname: 'Komi',
            japanese_name: '美遊・エーデルフェルト',
            sex: 'female',
            type: 'character',
            role: 'main-character',
            profile_picture:
                'https://pm1.narvii.com/7213/a5ea8f55fbb18752a8761b4b059fca9a2ae5a854r1-400-400v2_00.jpg',
            id: '8WZqW4hZMSmiucnKrTdai5',
        },
        {
            fname: 'Hitohito',
            lname: 'Tadano',
            japanese_name: '美遊・エーデルフェルト',
            sex: 'male',
            type: 'character',
            role: 'main-character',
            profile_picture:
                'https://www.anime-planet.com/images/characters/hitohito-tadano-132049.jpg',
            id: 'm5akibjJM2UGGHNdi4aQX3',
        },
        {
            fname: 'Rumiko',
            lname: 'Manbagi',
            japanese_name: '美遊・エーデルフェルト',
            sex: 'female',
            type: 'character',
            role: 'main-character',
            profile_picture:
                'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/7/76/Manbagi.PNG/revision/latest/scale-to-width-down/340?cb=20180722174428',
            id: 'm5akibjJM2UGGHNdi4aQX3',
        },
        {
            fname: 'Najimi',
            lname: 'Osana',
            japanese_name: '美遊・エーデルフェルト',
            sex: 'female',
            type: 'character',
            role: 'supporting-character',
            profile_picture:
                'https://pm1.narvii.com/7177/8771c01a3826dc32452b54123bcc7cfb6263f2bfr1-276-276v2_00.jpg',
            id: 'm5akibjJM2UGGHNdi4aQX3',
        },
    ];

    return {
        manga_id,
        main_title,
        bannerImage,
        profileImage,
        hero_image_alt_text,
        cover_image_alt_text,
        characters_full_list,
    };
};

export default MangaCharacters;
