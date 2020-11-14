import Link from 'next/link';
import { useState, useEffect, useContext } from 'react';

import kebabCase from 'lodash/kebabCase';
import { withRouter } from 'next/router';
import { SearchContext } from '@/ctx/search';

import { performSearch, details } from '@/queries/search/Search';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import InfiniteScroll from "react-infinite-scroll-component";

import { withEnglishLocaleAny, withEnglishLocale } from 'utilities/Localization';
import { withProfileImageAny } from 'utilities/Image';
import { withPremiereAny } from 'utilities/Premiere';
import { withType } from 'utilities/MediaType';
import { withSubType } from 'utilities/MediaSubtype';

const Search = ({ router, queryTime, results, hasMore, searchTerm, page }) => {
    return (
        <>
            <Header isSearchAvailable />
            <em className="results-displayer">
                Results displayed in {(queryTime).toFixed(2)} seconds
            </em>
            <div className="results-container">
                <div className="left-column">
                <InfiniteScroll
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
                                    href="/[id]"
                                    as={`/${item.id}_${kebabCase(item.title)}`}
                                >
                                    <div className="search-result__row">
                                        {item.profileImage && (
                                            <figure className="search-result__image">
                                                <img
                                                    src={item.profileImage}
                                                    alt={`${item.title} Cover (${item.media})`}
                                                />
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
                                            {item.type && (<strong>{item.type}</strong>)} 
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
                </InfiniteScroll>
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

    const client = ctx.apolloClient;
    
    const { results, hasMore } = await SearchQuery(client, searchTerm, page, []);
    const queryTime = (Date.now() - startTime) / 1000.0; // in ms 
    
    return {queryTime, results, hasMore, searchTerm, page};
};

const SearchQuery = async (client, searchTerm, pages, filter) => {
    const amountRequested = 10 + pages * 10
    // get ids and types from elastic search
    const res = await client.query({
        query: performSearch(),
        variables: {
            search: searchTerm,
            first:  amountRequested + 1,
            offset: 0,
            filter: filter,
        },
    }).then(res => {
        return res.data.querySearch.res
    }).catch(error => {
        return error
    });

    if (res instanceof Error) {
        // TODO proper visualization of the errors
        return {results: [], hasMore: false}
    }

    // enqueue graphql query to get details
    const promises = res.map(x => details(x.type, x.id, client));
    // wait
    const resolved = await Promise.all(promises.map(p => p.catch(e => {
        console.log('A promise failed to resolve', e);
    })));
    const validResults = resolved.filter(result => !(result instanceof Error));

    // TODO Universes

    // extract results
    const results = validResults.filter(function(r) {return r !== undefined}).map(r => {
        const data = r.data.result;

        return {
            id:             data.id,
            title:          withEnglishLocaleAny(data.names),
            description:    withEnglishLocale(data.descriptions),
            profileImage:   withProfileImageAny(data.images),
            media:          withType(data.__typename),
            type:           withSubType(data.__typename, data.type),
            premiere:       withPremiereAny(data.releaseDate, data.runnings),
            children:  undefined, // TODO: add children to query for all content which have releases, chapter or episodes
            parent: data.content ? {
                title:          withEnglishLocaleAny(data.content.names),
                media:          withType(data.content.__typename),
            } : undefined,
        };
    });

    return {results: results, hasMore: res.length == amountRequested}
}

const ChildContents = ({ episodes, animeId, animeTitle }) => {
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

export default withRouter(Search);
