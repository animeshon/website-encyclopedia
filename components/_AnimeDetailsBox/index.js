import Link from 'next/link';

export const AnimeDetailsBox = ({ obj }) => {
    const {
        english_title,
        japanese_title,
        romaji_title,
        episodes_number,
        media,
        status,
        season,
        genres,
        age_rating,
        universe,
        universe_id,
    } = obj;

    const mid_break_one = media || episodes_number || status || season;
    const mid_break_two = genres || age_rating || universe;

    return (
        <div className="details__table">
            {english_title && (
                <div className="details__row">
                    <div className="details__key">English</div>
                    <div className="details__value">{english_title}</div>
                </div>
            )}
            {japanese_title && (
                <div className="details__row">
                    <div className="details__key">Japanese</div>
                    <div className="details__value">{japanese_title}</div>
                </div>
            )}
            {romaji_title && (
                <div className="details__row">
                    <div className="details__key">Romaji</div>
                    <div className="details__value">{romaji_title}</div>
                </div>
            )}
            {/*  */}
            {(english_title || japanese_title || romaji_title) && (
                <hr className="details__breaker" />
            )}
            {/*  */}
            {media && (
                <div className="details__row">
                    <div className="details__key">Media</div>
                    <div className="details__value">{media}</div>
                </div>
            )}
            {(episodes_number || episodes_number === 0) && (
                <div className="details__row">
                    <div className="details__key">Episodes</div>
                    <div className="details__value">{episodes_number}</div>
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
            {age_rating && (
                <div className="details__row">
                    <div className="details__key">Age Rating</div>
                    <div className="details__value">{age_rating}</div>
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
