import Link from 'next/link';
import { withRouter } from 'next/router';

import { performSearch, details } from '@/queries/search/Search';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import SafeImage from '@/components/SafeImage';

import InfiniteScroll from "react-infinite-scroll-component";

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as rating from '@/utilities/AgeRating';
import { PremiereAny } from '@/utilities/Premiere';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { Rewrite } from '@/utilities/URI';
import { ExecuteQuery, ExecuteQueries, PrepareQuery } from '@/utilities/Query';

const Search = ({ router, queryTime, results, hasMore, searchTerm, page }) => {
    return (
        <>
            <Header isSearchAvailable />
            <div className="header_padder"/>
            <em className="results-displayer">
                Results displayed in {(queryTime).toFixed(2)} seconds
            </em><div className="results-container">
                <div className="left-column">
            {results && results.length ? (<InfiniteScroll
                    dataLength={results.length}
                    next={() => router.push({
                        pathname: '/search',
                        query: { q: searchTerm, p: page+1},
                    })}
                    hasMore={hasMore}
                    scrollThreshold={0.7}
                    >
                    {results.map((item, index) => {
                        const primary = index <= 3 ? 'primary' : 'secondary';
                        return (
                            <article
                                key={item.id}
                                className={`search-result anime ${primary}-result`}
                            >
                                <Link
                                    href={`${Rewrite(item.type, item.title, item.id)}`}
                                >
                                    <div className="search-result__row">
                                        {item.image && (
                                            <figure className="search-result__image">
                                                <SafeImage image={item.image} altText={`${item.title} Cover (${item.media})`}/>
                                            </figure>
                                        )}
                                        <header className="search-result__texts">
                                            <div className="search-result__breadcrumb">
                                                {item.parent && (
                                                    <span>{item.parent.media}</span>
                                                )}
                                                {item.parent && (
                                                    <span>{item.parent.title}</span>
                                                )}
                                                <span>{item.media}</span>
                                                <span>{item.title}</span>
                                            </div>
                                            <h2>{item.title}</h2>
                                            {item.subtype && (<strong>{item.subtype}</strong>)} 
                                            {item.premiere && (<small>{item.premiere}</small>)}
                                            <p>{item.description}</p>
                                        </header>
                                    </div>
                                </Link>
                                {/* TODO children
                                {item.childContents && primary == 'primary' && (
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
                                )} */}
                            </article>
                        );
                    })}
                </InfiniteScroll>) : (<>No result was found for the search term <strong>{searchTerm}</strong>.</>)}
                </div>
                <div className="right-column">
                    {/* TODO Universes */}
                </div>
            </div>
            <Footer contextualClass="search-footer" />
        </>
    );
}

Search.getInitialProps = async ctx => {
    const startTime = Date.now();

    const searchTerm = ctx.query.q;
    // max 10 + 90 results
    const page = Math.min(ctx.query.p !== undefined ? ctx.query.p : 0, 9);

    // No query, no results
    if (searchTerm === undefined) {
        return {queryTime:0, results:[]}
    }

    const { results, hasMore } = await SearchQuery(ctx, searchTerm, page, []);
    const queryTime = (Date.now() - startTime) / 1000.0; // in ms 

    return {queryTime, results, hasMore, searchTerm, page};
};

const SearchQuery = async (ctx, searchTerm, pages, filter) => {
    const amountRequested = 10 + pages * 10
    // get ids and types from elastic search
    const vars = {
        search: searchTerm,
        first:  amountRequested + 1,
        offset: 0,
        filter: filter,
    }
    const res = await ExecuteQuery(ctx, PrepareQuery(vars, performSearch(), (data, err) => { return data?.querySearch?.res; }));

    if (!res || res instanceof Error) {
        // TODO proper visualization of the errors
        return {results: [], hasMore: false}
    }

    // enqueue graphql query to get details
    const queries = res.map(x => {
        return PrepareQuery({id: x.id}, details(x.type));
    });
    // wait
    const queriesResults = await ExecuteQueries(ctx, queries);
    const validResults = queriesResults.filter(result => !(result instanceof Error));

    // TODO Universes

    // extract results
    const results = validResults.filter(function(r) {return r !== undefined}).map(r => {
        return {
            id:             r.id,
            type:           r.__typename,
            title:          locale.EnglishAny(r.names),
            description:    locale.English(r.descriptions),
            image:          image.ProfileAny(r.images, r.ageRatings),
            media:          Type(r.__typename),
            subtype:        Subtype(r.__typename, r.type),
            premiere:       PremiereAny(r.releaseDate, r.runnings),
            children:       undefined, // TODO: add children to query for all content which have releases, chapter or episodes
            parent: r.content ? {
                title:          locale.EnglishAny(r.content.names),
                media:          Type(r.content.__typename),
            } : undefined,
        };
    });

    return {results: results, hasMore: res.length > amountRequested}
}

// const ChildContents = ({ episodes, animeId, animeTitle }) => {
//     return episodes.map(episode => {
//         const image = episode.images[0]
//             ? episode.images[0].image.file.publicUri
//             : undefined;
//         const name = episode.names[0].text;
//         const descirption = episode.description[0]
//             ? episode.description[0].text
//             : undefined;
//         const episodeId = episode.id;

//         return (
//             <Link
//                 key={episodeId}
//                 href="/anime/[anime_id]/episodes/[episode_id]"
//                 as={`/anime/${animeId}_${kebabCase(
//                     animeTitle,
//                 )}/episodes/${episodeId}_${kebabCase(name)}`}
//             >
//                 <div className="search-result__aside__item">
//                     {image && (
//                         <figure>
//                             <img src={image} alt="" />
//                         </figure>
//                     )}
//                     <div className="search-result__aside__texts">
//                         <h4>{name}</h4>
//                         {descirption && <p>{descirption}</p>}
//                     </div>
//                 </div>
//             </Link>
//         );
//     });
// };

export default withRouter(Search);
