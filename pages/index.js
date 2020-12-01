import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { useEffect, useContext, useRef } from 'react';

import { SearchContext } from '@/ctx/Search';

import Button from '@/components/Button';
import Footer from '@/components/Footer';

const Home = ({ router }) => {
    const { push } = router;
    const { search, dispatchSearch } = useContext(SearchContext);
    const searchInput = useRef(null)

    useEffect(() => {
        searchInput.current.focus();
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
        <div>
            <Head>
                <title>Animeshon Encyclopedia</title>
                <meta name="description" content="The Animeshon Encyclopedia is the largest collection of Anime, Manga, Doujinshi, Light Novels, and Visual Novels on the planet with over 70 million indexed records." />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="home">
                <div className="home-header">
                    <Link href='https://animeshon.com/'>
                        About Animeshon
                </Link>
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
                            ref={searchInput}
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
        </div>
    );
};

export default withRouter(Home);
