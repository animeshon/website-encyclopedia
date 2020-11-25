import React from 'react';
import { withRouter } from 'next/router';

import { performSearch, details } from '@/queries/search/Search';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import ResultMetrics from '@/components/SearchResult/ResultMetrics';
import ResultDisplayer from '@/components/SearchResult/ResultDisplayer';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { PremiereAny } from '@/utilities/Premiere';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, ExecuteQueries, PrepareQuery } from '@/utilities/Query';

const Search = ({ queryTime, results, hasMore, searchTerm, page }) => {
    return (
        <>
            <Header isSearchAvailable />
            <div className="header_padder" />
            <ResultMetrics queryTime={queryTime}/>
            <div className="results-container">
                <div className="left-column">
                   <ResultDisplayer results={results} searchTerm={searchTerm} hasMore={hasMore} page={page}/>
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
        return { queryTime: 0, results: [] }
    }

    const { results, hasMore } = await SearchQuery(ctx, searchTerm, page, []);
    const queryTime = (Date.now() - startTime) / 1000.0; // in ms 

    return { queryTime, results, hasMore, searchTerm, page };
};

const SearchQuery = async (ctx, searchTerm, pages, filter) => {
    const amountRequested = 10 + pages * 10
    // get ids and types from elastic search
    const vars = {
        search: searchTerm,
        first: amountRequested + 1,
        offset: 0,
        filter: filter,
    }
    const res = await ExecuteQuery(ctx, PrepareQuery(vars, performSearch(), (data, err) => { return data?.querySearch?.res; }));

    if (!res || res instanceof Error) {
        // TODO proper visualization of the errors
        return { results: [], hasMore: false }
    }

    // enqueue graphql query to get details
    const queries = res.map(x => {
        return PrepareQuery({ id: x.id }, details(x.type));
    });
    // wait
    const queriesResults = await ExecuteQueries(ctx, queries);
    const validResults = queriesResults.filter(result => !(result instanceof Error));

    // TODO Universes

    // extract results
    const results = validResults.filter(function (r) { return r !== undefined }).map(r => {
        return {
            id: r.id,
            type: r.__typename,
            title: locale.EnglishAny(r.names),
            description: locale.English(r.descriptions),
            image: image.ProfileAny(r.images, r.ageRatings),
            media: Type(r.__typename),
            subtype: Subtype(r.__typename, r.type),
            premiere: PremiereAny(r.releaseDate, r.runnings),
            children: undefined, // TODO: add children to query for all content which have releases, chapter or episodes
            parent: r.content ? {
                title: locale.EnglishAny(r.content.names),
                media: Type(r.content.__typename),
            } : undefined,
        };
    });

    return { results: results, hasMore: res.length > amountRequested }
}

export default withRouter(Search);
