import React, { useContext } from 'react';
import Head from 'next/head';
import { withRouter, useRouter } from 'next/router';

import { SearchContext } from '@/ctx/Search';

import { performSearch, details } from '@/queries/search/Search';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import ResultMetrics from '@/components/SearchResult/ResultMetrics';
import ResultDisplayer from '@/components/SearchResult/ResultDisplayer';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import { PremiereAny } from '@/utilities/Premiere';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, ExecuteQueries, PrepareQuery } from '@/utilities/Query';

const WEBSITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME || 'Animeshon Encyclopedia';

const Search = ({ queryTime, results, hasMore, page }) => {
    const { search } = useContext(SearchContext);
    const router = useRouter();

    const url = uri.AbsoluteURI(router.pathname);

    const seo = {
        siteName: WEBSITE_NAME,
        title: `${WEBSITE_NAME} | Search results for ${search.search}`,
        description: `The Japanese Multimedia Culture search engine`,
        canonical: undefined,
        url: url,
        image: '../../public/brand/animeshon-brand-horizontal-small.svg',
    };

    return (
        <>
            <Head>
                <title>{seo.title}</title>
                {seo.canonical ? (<link rel="canonical" href={seo.canonical} />) : undefined}

                {/* SEO */}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {seo.description ? (<meta name="description" content={seo.description} />) : undefined}

                {/* Social Media & SEO */}
                <meta property="og:site_name" content={seo.siteName}></meta>
                <meta property="og:title" content={seo.title} />
                {seo.description ? (<meta property="og:description" content={seo.description} />) : undefined}
                {seo.image ? (<meta property="og:image" content={seo.image} />) : undefined}
                {seo.url ? <meta property="og:url" content={seo.url} /> : undefined}

                {/* Twitter */}
                <meta name="twitter:card" content={seo.image ? 'summary_large_image' : 'summary'} />
                <meta name="twitter:site" content="@AnimeshonSNS" />
                {seo.twitter ? (<meta name="twitter:creator" content={seo.twitter} />) : undefined}
                {seo.image ? (<meta name="twitter:image:alt" content={seo.title} />) : undefined}

                {/* Facebook */}
                {/* <meta property="fb:app_id" content="your_app_id" /> */}
            </Head>

            <Header isSearchAvailable />
            <div className="header_padder" />
            <ResultMetrics queryTime={queryTime} />
            <div className="results-container">
                <div className="left-column">
                    <ResultDisplayer results={results} searchTerm={search.search} hasMore={hasMore} page={page} />
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

    return { queryTime, results, hasMore, page };
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
