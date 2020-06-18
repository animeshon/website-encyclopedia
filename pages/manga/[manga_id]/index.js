import Link from 'next/link';
import parse from 'html-react-parser';
import { kebabCase, replace } from 'lodash';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';
import { MangaDetailsBox } from '@/components/_MangaDetailsBox';

const renderCharacters = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link
                href="/characters/[character_id]"
                as={`/characters/${item.id}_${kebabCase(
                    `${item.fname}-${item.lname}`,
                )}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.profilePic} />
                    </div>
                    <span>{item.fname}</span>
                </a>
            </Link>
        </li>
    ));
};

const renderAdaptations = items => {
    return items.map(item => (
        <li key={item.id}>
            <Link
                href={`/${item.type}/[${item.type}_id]`}
                as={`/${item.type}/${item.id}_${kebabCase(item.product_name)}`}
            >
                <a>
                    <div className="cover">
                        <img src={item.cover_url} />
                    </div>
                    <span>{replace(item.type, '-', ' ')}</span>
                </a>
            </Link>
        </li>
    ));
};

const Manga = ({
    manga_id,
    main_title,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    summary_description,
    characters_list,
    manga_details,
    adaptations_list,
}) => {
    return (
        <AnyWrapper
            anyId={manga_id}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={MangaNavigation}
            anyTitle={main_title}
            selectedMenu="Summary"
        >
            <main className="landing__description">
                {/*  */}
                <section className="landing-section-box">
                    <header>
                        <h3>Description</h3>
                    </header>
                    <p>{parse(summary_description)}</p>
                </section>
                {/* Characters */}
                <section className="landing-section-box">
                    <header>
                        <h3>Characters</h3>
                        <span />
                        {characters_list.length > 3 && (
                            <Link
                                href="/manga/[manga_id]/characters"
                                as={`/manga/${manga_id}/characters`}
                            >
                                <a className="view-all-link">View all</a>
                            </Link>
                        )}
                    </header>
                    <ul className="characters-list">
                        {renderCharacters(characters_list)}
                    </ul>
                </section>
                {/* Manga Timeline */}
                <section className="landing-section-box">
                    <header>
                        <h3>Manga Timeline</h3>
                        <span />
                    </header>
                </section>
                {/* Adaptations */}
                {adaptations_list.length !== 0 && (
                    <section className="landing-section-box">
                        <header>
                            <h3>Adaptations</h3>
                            <span />
                            {adaptations_count > 4 && (
                                <Link href="" as="">
                                    <a className="view-all-link">View all</a>
                                </Link>
                            )}
                        </header>
                        <ul className="adaptations-list">
                            {renderAdaptations(adaptations_list)}
                        </ul>
                    </section>
                )}
                {/*  */}
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <MangaDetailsBox obj={manga_details} pageType="manga-landing" />
            </aside>
        </AnyWrapper>
    );
};

Manga.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;

    const hero_image =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const cover_image = 'https://m.media-amazon.com/images/I/51B5wtc70mL.jpg';
    const main_title = "Komi Can't Communicate";
    const cover_image_alt_text = "Komi Can't Communicate Cover";
    const hero_image_alt_text = "Komi Can't Communicate Hero";
    const summary_description = `Socially anxious high school student Shoko Komi’s greatest
    dream is to make some friends, but everyone at school mistakes her crippling social
    anxiety for cool reserve! With the whole student body keeping their distance and
    Komi unable to utter a single word, friendship might be forever beyond her reach.
    <br /><br />
    Timid Tadano is a total wallflower, and that’s just the way he likes it. But all
    that changes when he finds himself alone in a classroom on the first day of high
    school with the legendary Komi. He quickly realizes she isn’t aloof—she’s just super
    awkward. Now he’s made it his mission to help her on her quest to make 100 friends!`;
    const characters_list = [
        {
            fname: 'Shouko',
            lname: 'Komi',
            profilePic:
                'https://pm1.narvii.com/7213/a5ea8f55fbb18752a8761b4b059fca9a2ae5a854r1-400-400v2_00.jpg',
            id: '8WZqW4hZMSmiucnKrTdai5',
        },
        {
            fname: 'Hitohito',
            lname: 'Tadano',
            profilePic:
                'https://www.anime-planet.com/images/characters/hitohito-tadano-132049.jpg',
            id: 'm5akibjJM2UGGHNdi4aQX3',
        },
        {
            fname: 'Rumiko',
            lname: 'Manbagi',
            profilePic:
                'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/7/76/Manbagi.PNG/revision/latest/scale-to-width-down/340?cb=20180722174428',
            id: 'y9g9z3N9Sxb58nGF2jmfqB',
        },
        {
            fname: 'Najimi',
            lname: 'Osana',
            profilePic:
                'https://pm1.narvii.com/7177/8771c01a3826dc32452b54123bcc7cfb6263f2bfr1-276-276v2_00.jpg',
            id: '3RnW4DLemcHdW2Job6xX2c',
        },
    ];
    const adaptations_list = [];
    const manga_details = {
        english_title: "Komi Can't Communicate",
        japanese_title: '古見さんは、コミュ症です。',
        romaji_title: 'Komi-san wa, Komyushou desu.',
        media: 'manga',
        chapters_number: 249,
        volumes_number: 16,
        status: 'ongoing',
        date_start: 'May 2016',
        date_end: '-',
        genres: ['Comedy', 'Drama'],
        age_rating: 'All',
        universe: 'standalone',
    };

    return {
        manga_id,
        main_title,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        summary_description,
        characters_list,
        manga_details,
        adaptations_list,
    };
};

export default Manga;
