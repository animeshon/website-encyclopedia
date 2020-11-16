import Link from 'next/link';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';

const renderChapters = (items, manga_id) => {
    return items.map(item => {
        return (
            <Link
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
        );
    });
};

const MangaChapters = ({
    manga_id,
    title,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    chapters,
}) => {
    return (
        <AnyWrapper
            id={manga_id}
            title={title}
            bannerImage={bannerImage}
            profileImage={profileImage}
            bannerImageAltText={bannerImageAltText}
            profileImageAltText={profileImageAltText}
            anyNav={MangaNavigation}
            selectedMenu="Chapters"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Chapters</h3>
                    </header>
                    <div className="grid-halves">
                        {renderChapters(chapters, manga_id)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

MangaChapters.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;
    const profileImage =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const bannerImage = 'https://m.media-amazon.com/images/I/51B5wtc70mL.jpg';
    const title = "Komi Can't Communicate";
    const bannerImageAltText = "Komi Can't Communicate Cover";
    const profileImageAltText = "Komi Can't Communicate Hero";

    const chapters = [
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
    ];

    return {
        manga_id,
        title,
        bannerImage,
        profileImage,
        bannerImageAltText,
        profileImageAltText,
        chapters,
    };
};

export default MangaChapters;
