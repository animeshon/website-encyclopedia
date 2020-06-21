import Link from 'next/link';
import Router from 'next/router';
import { useState, useEffect } from 'react';

import { useInputChange } from '@/functions/inputChange';

import Sidebar from '@/components/Sidebar';

const Header = ({ isSearchAvailable }) => {
    const [sidebar, setSidebar] = useState(false);

    const [input, handleInputChange, setFieldValue] = useInputChange();

    useEffect(() => {
        const { q } = Router.router.query;
        setFieldValue('searchQuery', q);
    }, []);

    const handleQuerySubmit = e => {
        const { searchQuery } = input;
        e.preventDefault();

        Router.push({
            pathname: '/search',
            query: { q: searchQuery },
        });
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
                        value={input.searchQuery}
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
