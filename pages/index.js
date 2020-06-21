import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect } from 'react';

import { useInputChange } from '@/functions/inputChange';

import Button from '@/components/Button';
import Footer from '@/components/Footer';

const Home = ({ router }) => {
    const { push } = router;
    const [input, handleInputChange, setFieldValue] = useInputChange();

    useEffect(() => {
        setFieldValue('searchQuery', '');
    }, []);

    const navigateToQuery = e => {
        const { searchQuery } = input;
        e.preventDefault();

        push({
            pathname: '/search',
            query: { q: searchQuery },
        });
    };

    // reverse condition to enable and disable the search query button
    const isButtonDisabled = !(input.searchQuery !== '');

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
