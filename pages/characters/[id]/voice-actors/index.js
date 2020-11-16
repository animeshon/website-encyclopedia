import Link from 'next/link';
import { kebabCase } from 'lodash';

import { CharacterNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import Button from '@/components/Button';

const renderVoiceActors = items => {
    return items.map(item => {
        const { fname, lname, nationality, picture, productions, id } = item;
        return (
            <article className="voice-actor">
                <figure>
                    <img src={picture} alt={`${fname} ${lname}`} />
                </figure>
                <div className="voice-actor__descriptions">
                    <header>
                        <h4>
                            {fname.en} {lname.en}
                        </h4>
                        {fname.jp && lname.jp && (
                            <h5>
                                {fname.jp}
                                {lname.jp}
                            </h5>
                        )}
                        <p className="appearences__media-type">
                            <span
                                className={`fp fp-sm custom-fp ${nationality}`}
                            />
                            Female
                        </p>
                    </header>
                    <Button
                        className="cherry-red medium"
                        as={`/people/${id}_${kebabCase(
                            `${fname.en}-${lname.en}`,
                        )}/`}
                        href="/people/[people_id]"
                        type="next-link"
                    >
                        More
                    </Button>
                </div>
                <aside>
                    {productions.map(production => {
                        const { name, list } = production;
                        return (
                            <>
                                <h6>
                                    Productions <span>({name.en})</span>
                                </h6>
                                {list.map(i => {
                                    const { name, id, type } = i;
                                    return (
                                        <p>
                                            <Link
                                                href={`/${type}/[${type}_id]`}
                                                as={`/${type}/${id}_${kebabCase(
                                                    name.en,
                                                )}`}
                                            >
                                                <a>{name.en}</a>
                                            </Link>
                                        </p>
                                    );
                                })}
                            </>
                        );
                    })}
                </aside>
            </article>
        );
    });
};

const CharacterVoiceActors = ({
    voice_actors,
    character_id,
    character_name,
    profileImage,
    profileImageAltText,
    bannerImage,
    bannerImageAltText,
}) => {
    return (
        <AnyWrapper
            id={character_id}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
            anyNav={CharacterNavigation}
            title={character_name}
            selectedMenu="Voice Actors"
        >
            <main className="landing__description landing__100">
                <section className="landing-section-box">
                    <header>
                        <h3>Voice Actors</h3>
                    </header>
                </section>
                <div className="grid-halves">
                    {voice_actors && renderVoiceActors(voice_actors)}
                </div>
            </main>
        </AnyWrapper>
    );
};

CharacterVoiceActors.getInitialProps = async ctx => {
    const { character_id } = ctx.query;
    const profileImage =
        'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg';
    const profileImageAltText = 'Monkey D. Luffy Hero';
    const bannerImage =
        'https://s-media-cache-ak0.pinimg.com/originals/0a/fb/46/0afb465b38987240997ed8d3cb054c64.png';
    const bannerImageAltText = 'Monkey D. Luffy Cover';
    const character_name = 'Monkey D. Luffy';

    const voice_actors = [
        {
            fname: {
                en: 'Takano',
                jp: '高乃',
            },
            lname: {
                en: 'Urara',
                jp: '麗',
            },
            sex: 'female',
            nationality: 'jp',
            id: 'f56027273eb6490d9ab82a2645e25d9a',
            picture:
                'https://cdn.myanimelist.net/images/voiceactors/3/17121.jpg',
            productions: [
                {
                    name: {
                        en: 'One Piece',
                        jp: 'ワンピース',
                    },
                    list: [
                        {
                            name: {
                                en: 'One Piece: Taose! Kaizoku Ganzack',
                                jp: 'One Piece: Taose! Kaizoku Ganzack',
                            },
                            id: 'f56027273eb6490d9ab82a2645e25d9a',
                            type: 'anime',
                        },
                    ],
                },
            ],
        },
        {
            fname: {
                en: 'Tanaka',
                jp: '田中',
            },
            lname: {
                en: 'Mayumi',
                jp: '真弓',
            },
            sex: 'female',
            nationality: 'jp',
            id: '7be468a9d66643c6ae3baa0ae2dab71b',
            picture:
                'https://cdn.myanimelist.net/images/voiceactors/3/16623.jpg',
            productions: [
                {
                    name: {
                        en: 'One Piece',
                        jp: 'ワンピース',
                    },
                    list: [
                        {
                            name: {
                                en: 'Gekijouban One Piece: Stampede',
                                jp: 'Gekijouban One Piece: Stampede',
                            },
                            id: '64b2f2f264534b08a06bbbb7795fa283',
                            type: 'manga',
                        },
                        {
                            name: {
                                en: 'One Piece',
                                jp: 'One Piece',
                            },
                            id: '7be468a9d66643c6ae3baa0ae2dab71b',
                            type: 'anime',
                        },
                        {
                            name: {
                                en: 'One Piece (2000)',
                                jp: 'One Piece (2000)',
                            },
                            id: 'b7e881ac72ca4cc487a0fc8e7c8f34b0',
                            type: 'manga',
                        },
                        {
                            name: {
                                en: 'One Piece 3D: Mugiwara Chase',
                                jp: 'One Piece 3D: Mugiwara Chase',
                            },
                            id: 'e2a53a72bffb42e789d881d3932e8bde',
                            type: 'manga',
                        },
                        {
                            name: {
                                en: 'One Piece Film: Gold',
                                jp: 'One Piece Film: Gold',
                            },
                            id: 'e3a6252c99a6481cae87cd9f85214031',
                            type: 'anime',
                        },
                        {
                            name: {
                                en: 'One Piece Film: Strong World',
                                jp: 'One Piece Film: Strong World',
                            },
                            id: '0508a89641274abd900605c4d25c7cbe',
                            type: 'manga',
                        },
                        {
                            name: {
                                en: 'One Piece Film: Gold',
                                jp: 'One Piece Film: Gold',
                            },
                            id: '36d8576be52f43bdbcc87b276619e29e',
                            type: 'anime',
                        },
                        {
                            name: {
                                en: 'One Piece Film: Strong World - Episode 0',
                                jp: 'One Piece Film: Strong World - Episode 0',
                            },
                            id: 'ac549b1d2a8c4b488cf3583669908994',
                            type: 'anime',
                        },
                    ],
                },
            ],
        },
    ];

    return {
        voice_actors,
        character_id,
        character_name,
        profileImage,
        profileImageAltText,
        bannerImage,
        bannerImageAltText,
    };
};

export default CharacterVoiceActors;
