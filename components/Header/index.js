import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { SearchContext } from '@/ctx/search';

import Sidebar from '@/components/Sidebar';

const Header = ({ isSearchAvailable }) => {
    const { search, dispatchSearch } = useContext(SearchContext);
    const [ sidebarOpen, setSidebar] = useState(false);

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
                query: { q: search.search },
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
            setSidebar(true);
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
            <Sidebar open={sidebarOpen} closeSidebar={handleSidebarOpening} />
        </header>
    );
};

export default Header;
