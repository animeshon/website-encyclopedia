

import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import Entry from '@/components/SearchResult/Entry';

import styles from './ResultDisplayer.module.css';

const ResultDisplayer = ({ results, hasMore, more, searchQuery }) => {
    return (
        <>
            {results && results.length ?
                (<InfiniteScroll
                    dataLength={results.length}
                    next={more}
                    hasMore={hasMore}
                    scrollThreshold={0.7}
                >
                    {results.map((model, index) => {
                        const primary = index <= 3 ? true : false;
                        return (<Entry item={model} primary={primary} key={model.GetResourceName()} />);
                    })}
                </InfiniteScroll>) : (<>No result was found for the search term <strong>{searchQuery}</strong>.</>)}
        </>
    );
};

export default ResultDisplayer;
