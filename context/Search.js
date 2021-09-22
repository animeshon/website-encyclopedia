import React from 'react';

export const SearchContext = React.createContext({});

const DEFAULT_FILTER = { s: "RELEVANCE", fds: true, fdc: true };
export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'changeSearchQuery':
            return { ...state, search: action.payload };
        case 'performNewSearch':
            return { ...state, filter: DEFAULT_FILTER };
        case 'applyFilter':
            return { ...state, filter: action.payload };
        case 'loadSearchQuery':
            const {q, ...other} = action.payload;
            return { ...state, search: q, filter: {...DEFAULT_FILTER, ...other, fds: other.fds != "false", fdc: other.fdc != "false" } };
        default:
            return { ...state };
    }
};
