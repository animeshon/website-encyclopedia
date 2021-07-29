import React, { useContext, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { withRouter, useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';

import LoadingBar from 'react-top-loading-bar'

import { SearchContext } from '@/ctx/Search';

import performSearch from '@/queries/Search';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import ResultMetrics from '@/components/SearchResult/ResultMetrics';
import ResultDisplayer from '@/components/SearchResult/ResultDisplayer';
import ResultFilter from '@/components/SearchResult/ResultFilter';
import FabEnciclopedia from '@/components/Fab/FabEnciclopedia';

import * as uri from '@/utilities/URI';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';
import { initializeApollo } from "@/root/lib/apolloClient";
import { DeleteUndefined } from '@/root/lib/server-side';

import Entity from '@/models/entity';

const WEBSITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME || 'Animeshon';

const Search = ({ searchQuery, queryTime, results, total, error = false }) => {
    const { search } = useContext(SearchContext);
    const router = useRouter();

    const [hasMore, setMore] = useState(results.length < total);
    const [resultsComulative, setResults] = useState([]);
    const [isError, setError] = useState(error);
    const apolloClient = useApolloClient();

    const ref = useRef(null);

    // TODO extend entity to handle parent content for chapters and episodes

    useEffect(() => {
        const models = results.map(r => {
            const model = new Entity(r);
            model.Localize();
            return model;
        })
        window.scrollTo(0, 0)
        setResults(models);
        setMore(results.length < total);
        setError(error);
    }, [results])

    const url = uri.AbsoluteURI(router.pathname);

    const seo = {
        siteName: WEBSITE_NAME,
        title: `${searchQuery} | Search with ${WEBSITE_NAME}`,
        description: `Search results for "${searchQuery}" on the largest encyclopedia available online with over 30 million indexed records. Find all information you need about Anime, Manga, Doujinshi, Light Novels, and Visual Novels right now!`,
        canonical: undefined,
        url: url,
        image: '../../public/brand/animeshon-brand-horizontal-small.svg',
    };

    const moreResults = async () => {
        ref.current?.continuousStart();
        const order = {
            sorting: search.filter?.s ?? "RELEVANCE",
            sortingDiretion: "DESC",
        }
    
        const filter = {
            typesAllowed: search.filter?.ft ?? [],
            subtypesAllowed: search.filter?.fst ?? [],
            discardSelfpublished: search.filter?.fds !== undefined ? !search.filter?.fds : false,
            discardCorporatepublished: search.filter?.fdc !== undefined ? !search.filter?.fdc :false,
        };

        console.log(search.filter)

        const { results, total, error } = await SearchQuery(apolloClient, search.search, 20, resultsComulative.length, filter, order);

        if (error) {
            setError(true);
        }

        const models = results.map(r => {
            const model = new Entity(r);
            model.Localize();
            return model;
        })

        const comb = resultsComulative.concat(models);
        setResults(comb);
        setMore(comb.length < total);
        ref.current?.complete();
    };
    return (
        <>
            <Head>
                <title>{seo.title}</title>
                {seo.canonical ? (<link rel="canonical" href={seo.canonical} />) : undefined}

                {/* SEO */}
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

            <LoadingBar color="#f11946" ref={ref} shadow={true} />

            <Header isSearchAvailable />
            <div className="header_padder" />

            <ResultMetrics results={resultsComulative.length} total={total} queryTime={queryTime} />
            <div className="results-container">
                <div className="left-column">
                    {!isError ? <>
                        <ResultFilter />

                        <ResultDisplayer results={resultsComulative} more={moreResults} hasMore={hasMore} searchQuery={searchQuery} />
                    </> : <p>An error has occured, please try again later</p>
                    }

                </div>
                <div className="right-column">
                    {/* TODO Universes */}
                </div>
            </div>
            <FabEnciclopedia />
            <Footer contextualClass="search-footer" />
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    const searchTerm = ctx.query.q;

    const apolloClient = initializeApollo();

    // No query, no results
    if (searchTerm === undefined) {
        return { props: { results: [], total: 0, queryTime: 0 } };
    }

    const order = {
        sorting: ctx.query.s ?? "RELEVANCE",
        sortingDiretion: "DESC",
    }

    const filter = {
        typesAllowed: ctx.query.ft ?? [],
        subtypesAllowed: ctx.query.fst ?? [],
        discardSelfpublished: ctx.query.fds == "false" ? true : false,
        discardCorporatepublished: ctx.query.fdc == "false" ? true :false,
    };

    // TODO query parent content for chapters and episodes
    const { results, total, queryTime, error } = await SearchQuery(apolloClient, searchTerm, 20, 0, filter, order);
    return {
        props: DeleteUndefined({
            initialApolloState: apolloClient.cache.extract(),
            searchQuery: searchTerm,
            queryTime,
            results: results,
            total,
            error
        })
    };
};

const SearchQuery = async (client, searchTerm, first, offset, filter, order) => {
    const startTime = Date.now();
    // get ids and types from elastic search
    const vars = {
        search: searchTerm,
        first: first,
        offset: offset,
        filter: filter,
        order: order,
    }
    const qs = await ExecuteQuery(client, PrepareQuery(vars, performSearch(), (data, err) => { return err ? err : data?.searchFulltext; }));
    const res = qs?.res;
    if (qs instanceof Error || res == undefined) {
        return { results: [], total: 0, queryTime: 0, error: true }
    }

    const queryTime = (Date.now() - startTime) / 1000.0; // in ms 
    return { results: res, total: qs.resultTotal, queryTime: queryTime, error: false }
}

export default withRouter(Search);
