import { useState } from 'react';

import CustomInput from '../Input';

const Search = () => {
    const [searchValue, setSearchsearchValue] = useState('');

    const handleOnChange = () => {
        setSearchsearchValue(e.target.value);
    };

    return (
        <div className="search">
            <CustomInput
                name="search__field"
                onChangeAction={handleOnChange}
                type="text"
                className="search__field"
                value={searchValue}
            />
        </div>
    );
};

export default Search;
