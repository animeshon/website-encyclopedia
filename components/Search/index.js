import React, { useState, useEffect } from 'react';

const ENTER_KEY = 13;

const Search = ({ placeholder, action = () => { }, delay = 0, className = "search__field" }) => {
    const [searchValue, setSearchsearchValue] = useState('');
    const [timer, setTimer] = useState(undefined);

    useEffect(() => {
        const t = setTimeout(() => {
            propagateChange();

        }, delay);

        setTimer(t);
        return () => clearTimeout(t);
    }, [searchValue]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        // Detach the listeners on component unmount.
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    })

    const propagateChange = () => {
        action(searchValue);
        clearTimeout(timer)
        setTimer(undefined);
    };

    const handleOnChange = (e) => {
        setSearchsearchValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === ENTER_KEY) {
            propagateChange();
        }
    }

    return (
        <div className="search">
            <input
                name="search__field"
                className={className}
                type="text"
                value={searchValue}
                onChange={handleOnChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Search;
