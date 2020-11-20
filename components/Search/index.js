import React, { useState, useEffect } from 'react';

import CustomInput from '@/components/Input';

const ENTER_KEY = 13;

const Search = ({placeholder, action = () => {}, delay = 0, style = "search__field"}) => {
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
            <CustomInput
                name="search__field"
                onChangeAction={handleOnChange}
                type="text"
                className={style}
                value={searchValue}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Search;
