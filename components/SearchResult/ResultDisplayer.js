

import React, { useContext } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchContext, searchReducer } from '@/ctx/Search';

import Entry from '@/components/SearchResult/Entry';

import styles from './ResultDisplayer.module.css';

const ResultDisplayer = ({ results, hasMore, more }) => {
    const { search } = useContext(SearchContext);

    return (
        <>
            {results && results.length ?
                (<InfiniteScroll
                    dataLength={results.length}
                    next={more}
                    hasMore={hasMore}
                    scrollThreshold={0.7}
                >
                    {results.map((item, index) => {
                        const primary = index <= 3 ? true : false;
                        return (<Entry item={item} primary={primary} key={item.id} />);
                    })}
                </InfiniteScroll>) : (<>No result was found for the search term <strong>{search.search}</strong>.</>)}
        </>
    );
};

export default ResultDisplayer;
