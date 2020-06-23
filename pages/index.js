import Link from 'next/link';
import { withRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';

import { SearchContext } from '@/ctx/search';

import { useInputChange } from '@/functions/inputChange';

import Button from '@/components/Button';
import Footer from '@/components/Footer';

const Home = ({ router }) => {
    const { push } = router;
    const { search, dispatchSearch } = useContext(SearchContext);

    useEffect(() => {
        dispatchSearch({
            type: 'performNewSearch',
            payload: '',
        });
    }, []);

    const navigateToQuery = e => {
        e.preventDefault();

        dispatchSearch({
            type: 'performNewSearch',
            payload: search.search,
        });

        push({
            pathname: '/search',
            query: { q: search.search },
        });
    };

    const handleInputChange = e => {
        dispatchSearch({
            type: 'performNewSearch',
            payload: e.currentTarget.value,
        });
    };

    // reverse condition to enable and disable the search query button
    const isButtonDisabled = !(search.search !== '');

    return (
        <div className="home">
            <div className="home-header">
                <Button className="cherry-red default" type="form-submit">
                    About Animeshon
                </Button>
            </div>
            <div className="home-search-box">
                <form onSubmit={navigateToQuery} className="internal-space">
                    <h1>
                        <span>Animeshon Manga and Anime Search</span>
                        <div className="brand" />
                    </h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-field"
                        name="searchQuery"
                        onChange={handleInputChange}
                    />
                    <Button
                        disabled={isButtonDisabled}
                        className="cyan-blue big"
                        type="form-submit"
                    >
                        Search
                    </Button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default withRouter(Home);
