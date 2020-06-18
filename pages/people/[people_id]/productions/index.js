import { PeopleNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';

const renderProductions = items => {
    return items.map(item => {
        const { cover_image, id, title, type, role } = item;
        return (
            <div key={id} className="appearences__item">
                <figure className="appearences__item-cover">
                    <img src={cover_image.en} />
                </figure>
                <article className="appearences__item-contents">
                    <header>
                        <h4>{title.en}</h4>
                        <h5>{title.jp}</h5>
                        <p className="appearences__media-type">{type}</p>
                    </header>
                    <aside>
                        {role.map(r => {
                            return (
                                <p>
                                    {r.name}: {r.number_participated}
                                </p>
                            );
                        })}
                    </aside>
                </article>
            </div>
        );
    });
};

const Productions = ({
    productions,
    people_id,
    main_title,
    hero_image,
    hero_image_alt_text,
    cover_image,
    cover_image_alt_text,
}) => {
    return (
        <AnyWrapper
            anyId={people_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={PeopleNavigation}
            anyTitle={main_title}
            selectedMenu="Productions"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Productions</h3>
                    </header>
                </section>
                <div className="appearences grid-halves">
                    {renderProductions(productions)}
                </div>
            </main>
        </AnyWrapper>
    );
};

Productions.getInitialProps = async ctx => {
    const { people_id } = ctx.query;
    const hero_image =
        'http://i1.wp.com/fapservice.com/wp-content/uploads/2016/08/HorribleSubs-Fate-Kaleid-Liner-PRISMA-ILLYA-3rei-01-720p.mkv_snapshot_11.51_2016.07.06_15.34.51_stitch.jpg';
    const cover_image =
        'https://www.nautiljon.com/images/people/00/27/oonuma_shin_19372.jpg?1516112465';
    const main_title = 'Oonuma Shin';
    const cover_image_alt_text = 'Oonuma Shin';
    const hero_image_alt_text = 'Oonuma Shin Hero';

    const productions = [
        {
            title: {
                en: 'One Piece',
                jp: 'ワンピース',
            },
            cover_image: {
                en:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                jp:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
            },
            type: 'anime',
            kind: 'anime',
            role: [
                {
                    name: 'Episode Direction',
                    number_participated: `12`,
                },
                {
                    name: 'Storyboard',
                    number_participated: `3`,
                },
            ],
        },
        {
            title: {
                en: 'One Piece',
                jp: 'ワンピース',
            },
            cover_image: {
                en:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                jp:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
            },
            type: 'manga',
            kind: 'manga',
            role: [
                {
                    name: 'Episode Direction',
                    number_participated: `12`,
                },
                {
                    name: 'Storyboard',
                    number_participated: `3`,
                },
            ],
        },
        {
            title: {
                en: 'One Piece',
                jp: 'ワンピース',
            },
            cover_image: {
                en:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                jp:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
            },
            type: 'anime',
            kind: 'anime',
            role: [
                {
                    name: 'Episode Direction',
                    number_participated: `12`,
                },
                {
                    name: 'Storyboard',
                    number_participated: `3`,
                },
            ],
        },
        {
            title: {
                en: 'One Piece',
                jp: 'ワンピース',
            },
            cover_image: {
                en:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
                jp:
                    'https://upload.wikimedia.org/wikipedia/en/9/90/One_Piece%2C_Volume_61_Cover_%28Japanese%29.jpg',
            },
            type: 'anime',
            kind: 'anime',
            role: [
                {
                    name: 'Episode Direction',
                    number_participated: `12`,
                },
                {
                    name: 'Storyboard',
                    number_participated: `3`,
                },
            ],
        },
    ];

    return {
        productions,
        people_id,
        main_title,
        hero_image,
        hero_image_alt_text,
        cover_image,
        cover_image_alt_text,
    };
};

export default Productions;
