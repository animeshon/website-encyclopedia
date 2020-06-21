import Link from 'next/link';

import MangaDetails from './MangaDetails';

export const MangaDetailsBox = ({ obj, pageType }) => {
    let data = {};
    if (pageType == 'manga-landing') {
        data = {
            author: obj.author,
            media: obj.media,
            chapters_number: obj.chapters_number,
            volumes_number: obj.volumes_number,
            status: obj.status,
            date_start: obj.date_start,
            date_end: obj.date_end,
        };
    }
    if (pageType == 'manga-volume-details') {
        data = {
            media: obj.media,
            chapters: obj.chapters_in_volume,
            volume_number: obj.volume_number,
            release_date: obj.release_date,
        };
    }
    if (pageType == 'manga-chapter-details') {
        data = {
            media: obj.media,
            pages_in_chapter: obj.pages_in_chapter,
            release_date: obj.release_date,
        };
    }
    return (
        <div className="details__table">
            {obj.english_title && (
                <div className="details__row">
                    <div className="details__key">English{`\n`}(title)</div>
                    <div className="details__value">{obj.english_title}</div>
                </div>
            )}
            {obj.japanese_title && (
                <div className="details__row">
                    <div className="details__key">Japanese{`\n`}(title)</div>
                    <div className="details__value">{obj.japanese_title}</div>
                </div>
            )}
            {obj.romaji_title && (
                <div className="details__row">
                    <div className="details__key">Romaji{`\n`}(title)</div>
                    <div className="details__value">{obj.romaji_title}</div>
                </div>
            )}
            {/*  */}
            <hr className="details__breaker" />
            {/*  */}
            <MangaDetails type={pageType} data={data} />
            {/*  */}
            <hr className="details__breaker" />
            {/*  */}
            {obj.genres && (
                <div className="details__row">
                    <div className="details__key">Genres</div>
                    <div className="details__value">
                        {obj.genres.map(element => `${element}, `)}
                    </div>
                </div>
            )}
            {obj.age_rating && (
                <div className="details__row">
                    <div className="details__key">Age Rating</div>
                    <div className="details__value">{obj.age_rating}</div>
                </div>
            )}
            {obj.universe && (
                <div className="details__row">
                    <div className="details__key">Universe</div>
                    <div className="details__value">
                        {obj.universe !== 'standalone' ||
                        obj.universe_id !== undefined ? (
                            <Link
                                href="/universe/[universe_id]"
                                as={`/universe/${obj.universe_id}_${obj.universe}`}
                            >
                                <a>{obj.universe}</a>
                            </Link>
                        ) : (
                            <span className="standalone-universe">
                                Standalone
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
