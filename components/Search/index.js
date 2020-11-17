import { useState } from 'react';

import CustomInput from '@/components/Input';

const Search = ({placeholder, action = undefined, style = "search__field"}) => {
    const [searchValue, setSearchsearchValue] = useState('');

    const handleOnChange = (e) => {
        setSearchsearchValue(e.target.value);
        if (action !== undefined) {
            action(e.target.value)
        }
    };

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
