import { CharacterNavigation } from '@/resources/navigation/allTabNavigations';
import { replace } from 'lodash';

import AnyWrapper from '@/components/_AnyWrapper';

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

const CharacterAppearences = ({
    appeareances,
    character_id,
    character_name,
    profileImage,
    hero_image_alt_text,
    bannerImage,
    cover_image_alt_text,
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
            selectedMenu="Appearences"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Appearences</h3>
                    </header>
                </section>
                <div className="appearences grid-halves">
                    {renderAppearences(appeareances)}
                </div>
            </main>
        </AnyWrapper>
    );
};

CharacterAppearences.getInitialProps = async ctx => {
    const { character_id } = ctx.query;
    const profileImage =
        'http://2.bp.blogspot.com/-IlqVBmHSO7c/UQk4sPRMVsI/AAAAAAAAAiI/TQm72CS8kls/s1600/Monkey+D.+Luffy+2.jpg';
    const hero_image_alt_text = 'Monkey D. Luffy Hero';
    const bannerImage =
        'https://s-media-cache-ak0.pinimg.com/originals/0a/fb/46/0afb465b38987240997ed8d3cb054c64.png';
    const cover_image_alt_text = 'Monkey D. Luffy Cover';
    const character_name = 'Monkey D. Luffy';

    const appeareances = [
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
    ];

    return {
        appeareances,
        character_id,
        character_name,
        profileImage,
        hero_image_alt_text,
        bannerImage,
        cover_image_alt_text,
    };
};

export default CharacterAppearences;
