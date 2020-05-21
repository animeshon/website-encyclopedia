import Link from 'next/link';

export const AnimeDetailsBox = ({ obj }) => {
    const {
        english_title,
        japanese_title,
        romaji_title,
        media,
        episodes_number,
        status,
        season,
        genres,
        age_rating,
        universe,
        universe_id,
    } = obj;
    return (
        <div className="details__table">
            <div className="details__row">
                <div className="details__key">English{`\n`}(title)</div>
                <div className="details__value">{english_title}</div>
            </div>
            <div className="details__row">
                <div className="details__key">Japanese{`\n`}(title)</div>
                <div className="details__value">{japanese_title}</div>
            </div>
            <div className="details__row">
                <div className="details__key">Romaji{`\n`}(title)</div>
                <div className="details__value">{romaji_title}</div>
            </div>
            {/*  */}
            <hr className="details__breaker" />
            {/*  */}
            <div className="details__row">
                <div className="details__key">Media</div>
                <div className="details__value">{media}</div>
            </div>
            <div className="details__row">
                <div className="details__key">Episodes</div>
                <div className="details__value">{episodes_number}</div>
            </div>
            <div className="details__row">
                <div className="details__key">Status</div>
                <div className="details__value">{status}</div>
            </div>
            <div className="details__row">
                <div className="details__key">Season</div>
                <div className="details__value">{season}</div>
            </div>
            {/*  */}
            <hr className="details__breaker" />
            {/*  */}
            <div className="details__row">
                <div className="details__key">Genres</div>
                <div className="details__value">
                    {genres.map(element => `${element}, `)}
                </div>
            </div>
            <div className="details__row">
                <div className="details__key">Age Rating</div>
                <div className="details__value">{age_rating}</div>
            </div>
            {universe && (
                <div className="details__row">
                    <div className="details__key">Universe</div>
                    <div className="details__value">
                        <Link
                            href="/universe/[universe_id]"
                            as={`/universe/${universe_id}_${universe}`}
                        >
                            <a>{universe}</a>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
