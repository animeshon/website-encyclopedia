import Link from 'next/link';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

import AnyWrapper from '@/components/_AnyWrapper';

const renderVolumes = (items, mangaId) => {
    return items.map(item => {
        return (
            <div key={item.id} className="volume-cover">
                <Link
                    as={`/manga/${mangaId}/volumes/volume-${item.issue_number}_${item.id}`}
                    href="/manga/[manga_id]/volumes/[volume_id]"
                >
                    <a>
                        <img src={item.cover.us} />
                    </a>
                </Link>
            </div>
        );
    });
};

const MangaVolumes = ({
    manga_id,
    main_title,
    cover_image,
    hero_image,
    cover_image_alt_text,
    hero_image_alt_text,
    volumes,
}) => {
    return (
        <AnyWrapper
            anyId={manga_id}
            anyTitle={main_title}
            coverImage={cover_image}
            heroImage={hero_image}
            coverImageAltText={cover_image_alt_text}
            heroImageAltText={hero_image_alt_text}
            anyNav={MangaNavigation}
            selectedMenu="Volumes"
        >
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Volumes</h3>
                    </header>
                    <div className="manga-volumes">
                        {renderVolumes(volumes, manga_id)}
                    </div>
                </section>
            </main>
        </AnyWrapper>
    );
};

MangaVolumes.getInitialProps = async ctx => {
    const { manga_id } = ctx.query;
    const hero_image =
        'https://dw9to29mmj727.cloudfront.net/promo/2016/5992-SeriesHeaders_Komi_2000x800.jpg';
    const cover_image = 'https://m.media-amazon.com/images/I/51B5wtc70mL.jpg';
    const main_title = "Komi Can't Communicate";
    const cover_image_alt_text = "Komi Can't Communicate Cover";
    const hero_image_alt_text = "Komi Can't Communicate Hero";
    const volumes = [
        {
            id: 'efghJcCd98TRH8TWKzdC54',
            cover: {
                us:
                    'https://dw9to29mmj727.cloudfront.net/products/1974707121.jpg',
                jp:
                    'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/e/e2/Komi_San_Volume_1.png',
            },
            issue_number: 1,
        },
        {
            id: 'WR2xkL44BVpovYhSM5wQEK',
            cover: {
                us:
                    'https://dw9to29mmj727.cloudfront.net/products/197470713X.jpg',
                jp:
                    'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/8/8f/M_Volume_2.jpg',
            },
            issue_number: 2,
        },
        {
            id: 'gmmtbLPiP8qLgxtsXYdDde',
            cover: {
                us:
                    'https://dw9to29mmj727.cloudfront.net/products/1974707148.jpg',
                jp:
                    'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/c/c3/Komi_San_Volume_3.png',
            },
            issue_number: 3,
        },
        {
            id: 'fKfmAtN4U3X4fJaCnnAQXY',
            cover: {
                us:
                    'https://dw9to29mmj727.cloudfront.net/products/1974707156.jpg',
                jp:
                    'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/3/3d/M_Volume_4.jpg',
            },
            issue_number: 4,
        },
        {
            id: 'tuxNcnJvfyYeQcxnVWus46',
            cover: {
                us:
                    'https://dw9to29mmj727.cloudfront.net/products/1974707164.jpg',
                jp:
                    'https://vignette.wikia.nocookie.net/komisan-wa-komyushou-desu/images/f/f4/M_Volume_5.jpg',
            },
            issue_number: 5,
        },
    ];

    return {
        manga_id,
        main_title,
        cover_image,
        hero_image,
        cover_image_alt_text,
        hero_image_alt_text,
        volumes,
    };
};

export default MangaVolumes;
