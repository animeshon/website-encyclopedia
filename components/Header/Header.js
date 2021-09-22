import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { SearchContext } from '@/ctx/Search';

import Sidebar from '@/components/Header/Sidebar';

import styles from './Header.module.css';

const Header = ({ isSearchAvailable }) => {
    const { search, dispatchSearch } = useContext(SearchContext);
    const [ sidebarOpen, setSidebar] = useState(false);

    useEffect(() => {
        dispatchSearch({
            type: 'loadSearchQuery',
            payload: Router.router.query,
        });
    }, []);

    const handleInputChange = e => {
        dispatchSearch({
            type: 'changeSearchQuery',
            payload: e.currentTarget.value,
        });
    };

    const handleQuerySubmit = e => {
        e.preventDefault();

        if (search.search != '') {
            dispatchSearch({
                type: 'performNewSearch',
            });

            Router.push({
                pathname: '/search',
                query: { q: search.search },
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
        <header className={styles.search_header}>
            <a href="https://animeshon.com">
                <h1 className={styles.brand}>
                    <span>Search Manga and Anime</span>
                </h1>
            </a>
            {isSearchAvailable ? (
                <form onSubmit={handleQuerySubmit} className={styles.search_group}>
                    <input
                        type="text"
                        className={styles.search_input}
                        name="searchQuery"
                        value={search.search || ''}
                        onChange={handleInputChange}
                    />
                </form>
            ) : (
                    <div className={styles.search_group} />
                )}
            <button
                onClick={handleSidebarOpening}
                id="sidebar-opener"
                className={styles.hamburger_icon}
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
