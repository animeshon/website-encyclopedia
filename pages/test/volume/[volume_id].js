import Link from 'next/link';
import { MangaDetailsBox } from '@/components/_MangaDetailsBox';

const renderBuyLinks = links => {
    let array = [];
    for (const key in links) {
        if (links.hasOwnProperty(key)) {
            array.push(
                <div key={key} className="links-row">
                    <p>
                        {key === 'jp' && 'Japan'}
                        {key === 'us' && 'United States'}
                    </p>
                    {links[key].map(link => {
                        return (
                            <a
                                key={link.id}
                                href={link.link}
                                target="_blank"
                                className="external-platform-button"
                            >
                                <img src={link.image.uri} alt={link.name} />
                            </a>
                        );
                    })}
                </div>,
            );
        }
    }
    return array;
};

const renderChapters = (items, manga_id) => {
    return items.map(item => {
        return (
            <li>
                <Link
                    key={item.id}
                    as={`/manga/${manga_id}/chapters/${item.id}`}
                    href="/manga/[manga_id]/chapters/[chapter_id]"
                >
                    <a className="chapters-line">
                        CHAPTER {item.issue_number} -{' '}
                        <strong>{item.name.en}</strong> /{' '}
                        <strong>{item.name.rmj}</strong> /{' '}
                        <strong>{item.name.jp}</strong>
                    </a>
                </Link>
            </li>
        );
    });
};

const MangaVolumePage = ({
    manga_id,
    title,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    volume_details,
}) => {
    return (
        <div className="any">
            <div className="any-landing container">
                <div className="product-page-offset">
                    <main className="landing__description">
                        <section className="landing-section-box">
                            <header>
                                <h3>Description</h3>
                            </header>
                            <p>{volume_details.description.en}</p>
                        </section>
                        {/*  */}
                        <section className="landing-section-box">
                            <header>
                                <h4>Buy Volume {volume_details.volume_number}</h4>
                                <span />
                            </header>
                            {volume_details.buy_links.length !== 0 ? (
                                <div className="grid-halves manga-links">
                                    {renderBuyLinks(volume_details.buy_links)}
                                </div>
                            ) : (
                                    <div className="no-links-available">
                                        We haven't found any source
                                    </div>
                                )}
                        </section>
                        <section className="landing-section-box">
                            <header>
                                <h4>
                                    Chapters in Volume {volume_details.volume_number}
                                </h4>
                                <span />
                            </header>
                            <ul className="grid-halves">
                                {renderChapters(volume_details.chapters, manga_id)}
                            </ul>
                        </section>
                    </main>
                </div>
                <aside className="landing__details">
                    <header>
                        <h3>Details</h3>
                    </header>
                    <MangaDetailsBox
                        obj={volume_details}
                        pageType="manga-volume-details"
                    />
                </aside>
            </div>
        </div>
    );
};

MangaVolumePage.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;
    const profileImage =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const bannerImage =
        'https://covers2.booksamillion.com/covers/bam/1/97/470/713/197470713X.jpg';
    const title = "Komi Can't Communicate";
    const bannerImageAltText = "Komi Can't Communicate Cover";
    const profileImageAltText = "Komi Can't Communicate Hero";

    const volume_details = {
        englishTitle: "Komi Can't Communicate",
        japaneseTitle: '古見さんは、コミュ症です。',
        romajiTitle: 'Komi-san wa, Komyushou desu.',
        media: 'manga',
        volume_number: 1,
        ageRating: 'All',
        description: {
            en: `Socially anxious high school student <strong>Shoko Komi</strong>’s
                greatest dream is to make some friends, but everyone at
                school mistakes her crippling social anxiety for cool
                reserve! With the whole student body keeping their distance
                and Komi unable to utter a single word, friendship might
                be forever beyond her reach.
                <br /><br />
                Timid Tadano is a total wallflower, and that’s just the way
                he likes it. But all that changes when he finds himself
                alone in a classroom on the first day of high school with
                the legendary Komi. He quickly realizes she isn’t aloof—she’s
                just super awkward. Now he’s made it his mission to help her
                on her quest to make 100 friends!`,
        },
        buy_links: {
            jp: [
                {
                    name: 'amazon',
                    link: 'https://amazon.co.jp/',
                    image: '/images/platform-amazon-jp.png',
                    id: 'jhaksjdha',
                },
                {
                    name: 'cd japan',
                    link: 'https://cd-japan.jp/',
                    image: '/images/platform-cdjapan.png',
                    id: 'alkjdfsgk',
                },
                {
                    name: 'ebay',
                    link: 'https://ebay.jp/',
                    image: '/images/platform-ebay.png',
                    id: 'alkshjgdfklj',
                },
            ],
            us: [
                {
                    name: 'amazon',
                    link: 'https://amazon.com/',
                    image: '/images/platform-amazon-us.png',
                    id: 'akhjsfhg',
                },
                {
                    name: 'viz media',
                    link: 'https://vizmedia.com/',
                    image: '/images/platform-vizmedia.png',
                    id: 'jhakkjsdhfklsjdha',
                },
                {
                    name: 'ebay',
                    link: 'https://ebay.com/',
                    image: '/images/platform-ebay.png',
                    id: 'sdkjfhg',
                },
            ],
        },
        chapters_in_volume: [0, 16],
        chapters: [
            {
                name: {
                    en: 'Oneshot',
                    rmj: 'Futsū no Hito De',
                    jp: '苦手です。',
                },
                issue_number: 0,
                id: '1',
            },
            {
                name: {
                    en: 'A Normal Person',
                    rmj: 'Futsū no Hito De',
                    jp: '苦手です。',
                },
                issue_number: 1,
                id: '12',
            },
            {
                name: {
                    en: 'Peaceful',
                    rmj: 'Heion Desu.',
                    jp: '平穏です。',
                },
                issue_number: 2,
                id: '123',
            },
            {
                name: {
                    en: 'Spectre',
                    rmj: 'Kusemono Desu.',
                    jp: '曲者苦手です。',
                },
                issue_number: 3,
                id: '1234',
            },
        ],
        release_date: {
            jp: 'Feb 17, 2016',
            us: 'Mar 23, 2017',
            de: 'Mar 28, 2017',
            it: 'Mar 29, 2017',
        },
    };

    return {
        manga_id,
        title,
        bannerImage,
        profileImage,
        bannerImageAltText,
        profileImageAltText,
        volume_details,
    };
};

export default MangaVolumePage;
