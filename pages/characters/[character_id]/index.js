import Link from 'next/link';
import parse from 'html-react-parser';
import { replace } from 'lodash';

import { CharacterNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import { CharactersDetailsBox } from '@/components/_CharactersDetailsBox';

const renderAppearences = items => {
    return items.map(item => (
        <div className="appearences__item">
            <figure className="appearences__item-cover">
                <img src={item.bannerImage.en} />
            </figure>
            <article className="appearences__item-contents">
                <header>
                    <h4>{item.title.en}</h4>
                    <h5>{item.title.jp}</h5>
                    <p className="appearences__media-type">{item.type}</p>
                </header>
                <aside>
                    <p>
                        {item.year.start} - {item.year.end}
                        <span>|</span>
                        {item.kind}
                        <span>|</span>
                        {item.number_of_issues} Episodes
                    </p>
                    <p>{replace(item.role, '-', ' ')}</p>
                </aside>
            </article>
        </div>
    ));
};

const Character = ({
    character_id,
    character_name,
    character_info,
    profileImage,
    hero_image_alt_text,
    bannerImage,
    cover_image_alt_text,
    summary_description,
}) => {
    return (
        <AnyWrapper
            anyId={character_id}
            bannerImage={bannerImage}
            profileImage={profileImage}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={CharacterNavigation}
            anyTitle={character_name}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p>{parse(summary_description)}</p>
                </section>
                <section className="landing-section-box">
                    <header>
                        <h3>Pictures</h3>
                        <span />
                        {character_info.number_of_pictures > 4 && (
                            <Link
                                href="/characters/[character_id]/pictures"
                                as={`/characters/${character_id}/pictures`}
                            >
                                <a className="view-all-link">View all</a>
                            </Link>
                        )}
                    </header>
                    <div className="picture__masonry_home">
                        {character_info.pictures.map(item => {
                            return (
                                <div className="tile">
                                    <img src={item} alt="" />
                                </div>
                            );
                        })}
                    </div>
                </section>
                <section className="landing-section-box">
                    <header>
                        <h3>Appearences</h3>
                        <span />
                        {character_info.number_of_appearences > 4 && (
                            <Link
                                href="/characters/[character_id]/appearences"
                                as={`/characters/${character_id}/appearences`}
                            >
                                <a className="view-all-link">View all</a>
                            </Link>
                        )}
                    </header>
                    <div className="appearences summary__box">
                        {renderAppearences(character_info.appearences)}
                    </div>
                </section>
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Info</h3>
                </header>
                <CharactersDetailsBox obj={character_info} />
            </aside>
        </AnyWrapper>
    );
};

Character.getInitialProps = async ctx => {
    const { character_id } = ctx.query;
    const profileImage =
        'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg';
    const hero_image_alt_text = 'Monkey D. Luffy Hero';
    const bannerImage =
        'https://s-media-cache-ak0.pinimg.com/originals/0a/fb/46/0afb465b38987240997ed8d3cb054c64.png';
    const cover_image_alt_text = 'Monkey D. Luffy Cover';
    const character_name = 'Monkey D. Luffy';
    const summary_description = `A mysterious girl who is chosen by Sapphire to become its new master and then adopted 
    by Luvia. She takes her duties as a Magical Girl very seriously and is initially dismissive 
    of Illya’s abilities, but gradually warms up to Illya. She comes to value Illya’s friendship 
    greatly and is highly protective of her.
    <br /><br />
    <em>Source: Wikipedia</em>`;

    const character_info = {
        japanese_name: '美遊・エーデルフェルト',
        birth_date: '20/07/????',
        gender: 'female',
        abilities: ['clever', 'genius'],
        clothing: [
            'thigh highs',
            'school uniform',
            'PE uniform',
            'brassiere',
            'maid dress',
        ],
        entity: 'human',
        fashion_accessories: ['hair clip'],
        fetish_appeals: ['Zettai Ryouiki'],
        looks: ['yellow eyes', 'black hair', 'shoulder-length hair'],
        personality: ['kuudere', 'logical'],
        resources: [
            { label: 'wikipedia EN', link: 'https://en.wikipedia.net' },
            { label: 'wikipedia JP', link: 'https://jp.wikipedia.net' },
        ],
        pictures: [
            'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg',
            'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg',
            'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg',
        ],
        number_of_pictures: 12,
        appearences: [
            {
                title: {
                    en: 'One Piece',
                    jp: 'ワンピース',
                },
                bannerImage: {
                    en:
                        'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                    jp:
                        'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                },
                type: 'anime',
                kind: 'anime',
                number_of_issues: 12,
                year: {
                    start: '2013',
                    end: 'ongoing',
                },
                role: 'main-character',
            },
            {
                title: {
                    en: 'One Piece',
                    jp: 'ワンピース',
                },
                bannerImage: {
                    en:
                        'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                    jp:
                        'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                },
                type: 'manga',
                kind: 'manga',
                number_of_issues: 12,
                year: {
                    start: '2013',
                    end: 'ongoing',
                },
                role: 'main-character',
            },
            {
                title: {
                    en: 'One Piece',
                    jp: 'ワンピース',
                },
                bannerImage: {
                    en:
                        'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                    jp:
                        'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                },
                type: 'anime',
                kind: 'anime',
                number_of_issues: 12,
                year: {
                    start: '2013',
                    end: 'ongoing',
                },
                role: 'main-character',
            },
        ],
        number_of_appearences: 10,
    };

    return {
        character_id,
        character_name,
        character_info,
        profileImage,
        hero_image_alt_text,
        bannerImage,
        cover_image_alt_text,
        summary_description,
    };
};

export default Character;
