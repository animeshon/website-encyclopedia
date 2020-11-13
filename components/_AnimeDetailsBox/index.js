import Link from 'next/link';

export const AnimeDetailsBox = ({ obj }) => {
    const {
        englishTitle,
        japaneseTitle,
        romajiTitle,
        episodeCount,
        media,
        status,
        season,
        genres,
        ageRating,
        universe,
        universe_id,
    } = obj;

    const mid_break_one = media || episodeCount || status || season;
    const mid_break_two = genres || ageRating || universe;

    return (
        <div className="details__table">
            {englishTitle && (
                <div className="details__row">
                    <div className="details__key">English</div>
                    <div className="details__value">{englishTitle}</div>
                </div>
            )}
            {japaneseTitle && (
                <div className="details__row">
                    <div className="details__key">Japanese</div>
                    <div className="details__value">{japaneseTitle}</div>
                </div>
            )}
            {romajiTitle && (
                <div className="details__row">
                    <div className="details__key">Romaji</div>
                    <div className="details__value">{romajiTitle}</div>
                </div>
            )}
            {/*  */}
            {(englishTitle || japaneseTitle || romajiTitle) && (
                <hr className="details__breaker" />
            )}
            {/*  */}
            {media && (
                <div className="details__row">
                    <div className="details__key">Media</div>
                    <div className="details__value">{media}</div>
                </div>
            )}
            {(episodeCount || episodeCount === 0) && (
                <div className="details__row">
                    <div className="details__key">Episodes</div>
                    <div className="details__value">{episodeCount}</div>
                </div>
            )}
            {status && (
                <div className="details__row">
                    <div className="details__key">Status</div>
                    <div className="details__value">{status}</div>
                </div>
            )}
            {season && (
                <div className="details__row">
                    <div className="details__key">Season</div>
                    <div className="details__value">{season}</div>
                </div>
            )}
            {/*  */}
            {mid_break_one && mid_break_two && (
                <hr className="details__breaker" />
            )}
            {/*  */}
            {genres && genres.length > 0 && (
                <div className="details__row">
                    <div className="details__key">Genres</div>
                    <div className="details__value">
                        {genres.map(element => `${element}, `)}
                    </div>
                </div>
            )}
            {ageRating && (
                <div className="details__row">
                    <div className="details__key">Age Rating</div>
                    <div className="details__value">{ageRating}</div>
                </div>
            )}
            {universe && (
                <div className="details__row">
                    <div className="details__key">Universe</div>
                    <div className="details__value">
                        <Link
                            href="/universe/[universe.id]"
                            as={`/universe/${universe.id}_${universe.name}`}
                        >
                            <a>{universe.name}</a>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
