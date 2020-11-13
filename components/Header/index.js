import Link from 'next/link';
import Router from 'next/router';
import { useState, useEffect, useContext } from 'react';

import { SearchContext } from '@/ctx/search';

import { useInputChange } from '@/functions/inputChange';

import Sidebar from '@/components/Sidebar';

const Header = ({ isSearchAvailable }) => {
    const { search, dispatchSearch } = useContext(SearchContext);
    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {
        const { q } = Router.router.query;
        dispatchSearch({
            type: 'performNewSearch',
            payload: q,
        });
    }, []);

    const handleInputChange = e => {
        dispatchSearch({
            type: 'performNewSearch',
            payload: e.currentTarget.value,
        });
    };

    const handleQuerySubmit = e => {
        e.preventDefault();

        if (search.search != '') {
            dispatchSearch({
                type: 'performNewSearch',
                payload: search.search,
            });

            Router.push({
                pathname: '/search',
                query:  { q: search.search } ,
            });
        } else {
            dispatchSearch({
                type: 'performNewSearch',
                payload: search.search,
            });
        }
    };

    const handleSidebarOpening = e => {
        const target = e.currentTarget.id === 'sidebar-opener';
        if (target) {
            setSidebar(!sidebar);
        } else {
            setSidebar(false);
        }
    };

    return (
        <header className="search-header">
            <Link href="/" as="/">
                <h1 className="brand">
                    <span>Search Manga and Anime</span>
                </h1>
            </Link>
            {isSearchAvailable ? (
                <form onSubmit={handleQuerySubmit} className="search-group">
                    <input
                        type="text"
                        className="search-input"
                        name="searchQuery"
                        value={search.search}
                        onChange={handleInputChange}
                    />
                </form>
            ) : (
                <div className="search-group" />
            )}
            <button
                onClick={handleSidebarOpening}
                id="sidebar-opener"
                className="hamburger-icon"
            >
                <span />
                <span />
                <span />
            </button>
            <Sidebar isOpened={sidebar} closeSidebar={handleSidebarOpening} />
        </header>
    );
};

export default Header;
