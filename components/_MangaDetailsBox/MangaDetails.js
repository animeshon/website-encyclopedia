const MangaDetails = ({ type, data }) => {
    if (type === 'manga-landing') {
        return (
            <>
                <div className="details__row">
                    <div className="details__key">Media</div>
                    <div className="details__value">{data.media}</div>
                </div>
                {data.chapterCount > 0 && (
                    <div className="details__row">
                        <div className="details__key">Chapters</div>
                        <div className="details__value">{data.chapterCount}</div>
                    </div>
                )}
                {data.volumeCount > 0 && (
                    <div className="details__row">
                        <div className="details__key">Volumes</div>
                        <div className="details__value">{data.volumeCount}</div>
                    </div>
                )}
                {data.status && (
                    <div className="details__row">
                        <div className="details__key">Status</div>
                        <div className="details__value">{data.status}</div>
                    </div>
                )}
                {data.date_start && (
                    <div className="details__row">
                        <div className="details__key">Date</div>
                        <div className="details__value">
                            {data.date_start} -{' '}
                            {data.date_end === '-' ? 'Ongoing' : data.date_end}
                        </div>
                    </div>
                )}
            </>
        );
    }
    if (type === 'manga-volume-details') {
        return (
            <>
                <div className="details__row">
                    <div className="details__key">Media</div>
                    <div className="details__value">{data.media}</div>
                </div>
                <div className="details__row">
                    <div className="details__key">Chapters</div>
                    <div className="details__value">
                        {data.chapters[0]} - {data.chapters[1]}
                    </div>
                </div>
                <div className="details__row">
                    <div className="details__key">Volume Number</div>
                    <div className="details__value">{data.volume_number}</div>
                </div>
                <div className="details__row">
                    <div className="details__key">Release Date</div>
                    <div className="details__value">
                        {data.release_date.jp && (
                            <p>
                                <span className="fp fp-sm custom-fp jp" />
                                {data.release_date.jp}
                            </p>
                        )}
                        {data.release_date.us && (
                            <p>
                                <span className="fp fp-sm custom-fp us" />
                                {data.release_date.us}
                            </p>
                        )}
                        {data.release_date.de && (
                            <p>
                                <span className="fp fp-sm custom-fp de" />
                                {data.release_date.de}
                            </p>
                        )}
                        {data.release_date.it && (
                            <p>
                                <span className="fp fp-sm custom-fp it" />
                                {data.release_date.it}
                            </p>
                        )}
                    </div>
                </div>
            </>
        );
    }
    if (type === 'manga-chapter-details') {
        return (
            <>
                <div className="details__row">
                    <div className="details__key">Media</div>
                    <div className="details__value">{data.media}</div>
                </div>
                <div className="details__row">
                    <div className="details__key">Length</div>
                    <div className="details__value">
                        {data.pages_in_chapter}
                    </div>
                </div>
                <div className="details__row">
                    <div className="details__key">Release Date</div>
                    <div className="details__value">
                        {data.release_date.jp && (
                            <p>
                                <span className="fp fp-sm custom-fp jp" />
                                {data.release_date.jp}
                            </p>
                        )}
                        {data.release_date.us && (
                            <p>
                                <span className="fp fp-sm custom-fp us" />
                                {data.release_date.us}
                            </p>
                        )}
                        {data.release_date.de && (
                            <p>
                                <span className="fp fp-sm custom-fp de" />
                                {data.release_date.de}
                            </p>
                        )}
                        {data.release_date.it && (
                            <p>
                                <span className="fp fp-sm custom-fp it" />
                                {data.release_date.it}
                            </p>
                        )}
                    </div>
                </div>
            </>
        );
    }
};

export default MangaDetails;
