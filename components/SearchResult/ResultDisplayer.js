

import React from 'react';
import { useRouter } from 'next/router'
import InfiniteScroll from "react-infinite-scroll-component";

import Entry from '@/components/SearchResult/Entry';

import styles from './ResultDisplayer.module.css';

const ResultDisplayer = ({ results, hasMore, searchTerm, page }) => {
    const router = useRouter()
    const moreResults = () => {
        router.push({
            pathname: '/search',
            query: { q: searchTerm, p: page + 1 },
        })
    }
    return (
        <>
            {results && results.length ? 
            (<InfiniteScroll
                dataLength={results.length}
                next={moreResults}
                hasMore={hasMore}
                scrollThreshold={0.7}
                useWindow={false}
            >
                {results.map((item, index) => {
                    const primary = index <= 3 ? true : false;
                    return (<Entry item={item} primary={primary} key={item.id} />);
                })}
            </InfiniteScroll>) : (<>No result was found for the search term <strong>{searchTerm}</strong>.</>)}
        </>
    );
};

export default ResultDisplayer;
