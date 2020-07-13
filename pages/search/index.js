import Link from 'next/link';

import kebabCase from 'lodash/kebabCase';

import performSearch from '@/queries/search/Search';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Search = ({ manga, anime }) => {
    return (
        <>
            <Header isSearchAvailable />
            <em className="results-displayer">
                Results displayed in 0.4 seconds
            </em>
            <div className="results-container">
                <div className="left-column">
                    {anime.map((item, index) => {
                        const primary = index == 0 ? 'primary' : 'secondary';
                        const mainId = item.id;
                        const mainCoverImage = item.images[0]
                            ? item.images[0].image.file.publicUri
                            : undefined;
                        const mainTitle = item.names[0].text;
                        const mainDescription = item.description[0].text;
                        const episodes = item.episodes
                            ? item.episodes
                            : undefined;

                        // console.log(episodes);
                        return (
                            <article
                                key={mainId}
                                className={`search-result anime ${primary}-result`}
                            >
                                <Link
                                    href="/anime/[anime_id]"
                                    as={`/anime/${mainId}_${kebabCase(
                                        mainTitle,
                                    )}`}
                                >
                                    <div className="search-result__row">
                                        {mainCoverImage && (
                                            <figure className="search-result__image">
                                                <img
                                                    src={mainCoverImage}
                                                    alt={`${mainTitle} Cover (Anime)`}
                                                />
                                            </figure>
                                        )}
                                        <header className="search-result__texts">
                                            <div className="search-result__breadcrumb">
                                                <span>Anime</span>
                                                <span>{mainTitle}</span>
                                            </div>
                                            <h2>{mainTitle} (Anime)</h2>
                                            <strong>Anime</strong>
                                            <p>{mainDescription}</p>
                                        </header>
                                    </div>
                                </Link>
                                {episodes && primary == 'primary' && (
                                    <aside className="search-result__aside">
                                        <h3>Episodes</h3>
                                        <div className="search-result__column">
                                            <AnimeEpisodes
                                                animeTitle={mainTitle}
                                                animeId={mainId}
                                                episodes={episodes}
                                            />
                                        </div>
                                        <div className="search-result__more-trigger">
                                            <Link
                                                href="/anime/[anime_id]/episodes"
                                                as={`/anime/${mainId}_${kebabCase(
                                                    mainTitle,
                                                )}/episodes`}
                                            >
                                                <button>more</button>
                                            </Link>
                                        </div>
                                    </aside>
                                )}
                            </article>
                        );
                    })}

                    {manga &&
                        manga.map((item, index) => {
                            const primary =
                                index == 0 ? 'primary' : 'secondary';
                            const volumes = item.volumes[0]
                                ? item.volumes[0]
                                : undefined;
                            const mainId = item.id;
                            const mainCoverImage = item.images[0]
                                ? item.images[0].image.file.publicUri
                                : undefined;
                            const mainTitle = item.names[0]
                                ? item.names[0].text
                                : 'UNDEFINED';
                            const mainDescription = item.description[0].text;

                            return (
                                <article
                                    key={mainId}
                                    className={`search-result manga ${primary}-result`}
                                >
                                    <Link
                                        href="/manga/[manga_id]"
                                        as={`/manga/${mainId}_${kebabCase(
                                            mainTitle,
                                        )}`}
                                    >
                                        <div className="search-result__row">
                                            <section className="search-result__contents">
                                                <figure className="search-result__image">
                                                    <img
                                                        src={mainCoverImage}
                                                        alt={`${mainTitle} (Manga)`}
                                                    />
                                                </figure>
                                                <header className="search-result__texts">
                                                    <div className="search-result__breadcrumb">
                                                        <span>Manga</span>
                                                        <span>{mainTitle}</span>
                                                    </div>
                                                    <h2>{mainTitle} (Manga)</h2>
                                                    <strong>
                                                        Manga Series
                                                    </strong>
                                                    <p>{mainDescription}</p>
                                                </header>
                                            </section>
                                        </div>
                                    </Link>
                                    {volumes && primary == 'primary' && (
                                        <aside className="search-result__aside">
                                            <h3>Volumes</h3>
                                            <div className="search-result__column">
                                                <MangaVolumes
                                                    volumes={volumes}
                                                />
                                            </div>
                                            <div className="search-result__more-trigger">
                                                <Link
                                                    href="/manga/[manga_id]"
                                                    as={`/manga/${mainId}_${mainTitle}/volumes`}
                                                >
                                                    <button>more</button>
                                                </Link>
                                            </div>
                                        </aside>
                                    )}
                                </article>
                            );
                        })}
                </div>
                <div className="right-column"></div>
            </div>
            <Footer contextualClass="search-footer" />
        </>
    );
};

const AnimeEpisodes = ({ episodes, animeId, animeTitle }) => {
    return episodes.map(episode => {
        const image = episode.images[0]
            ? episode.images[0].image.file.publicUri
            : undefined;
        const name = episode.names[0].text;
        const descirption = episode.description[0]
            ? episode.description[0].text
            : undefined;
        const episodeId = episode.id;

        return (
            <Link
                key={episodeId}
                href="/anime/[anime_id]/episodes/[episode_id]"
                as={`/anime/${animeId}_${kebabCase(
                    animeTitle,
                )}/episodes/${episodeId}_${kebabCase(name)}`}
            >
                <div className="search-result__aside__item">
                    {image && (
                        <figure>
                            <img src={image} alt="" />
                        </figure>
                    )}
                    <div className="search-result__aside__texts">
                        <h4>{name}</h4>
                        {descirption && <p>{descirption}</p>}
                    </div>
                </div>
            </Link>
        );
    });
};

const MangaVolumes = ({ volumes }) => {
    return volumes.map((volume, index) => {
        return (
            <div key={volume.id} className="search-result__aside__item">
                <figure>
                    <img src="" alt="" />
                </figure>
                <div className="search-result__aside__texts">
                    <h4>Volume {index}</h4>
                    <p>descritpion</p>
                </div>
            </div>
        );
    });
};

Search.getInitialProps = async ctx => {
    const searchTerm = ctx.query.q;
    const client = ctx.apolloClient;

    // console.name(searchTerm);

    const res = await client.query({
        query: performSearch(searchTerm),
    });

    const {
        data: { queryAnime, queryManga },
    } = res;

    const manga = queryManga;
    const anime = queryAnime;

    return {
        manga,
        anime,
    };
};

export default Search;
