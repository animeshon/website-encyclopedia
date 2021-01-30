import React from 'react';

export const SearchContext = React.createContext({});

export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'changeSearchQuery':
            return { ...state, search: action.payload };
        case 'performNewSearch':
            return { ...state, filter: undefined };
        case 'applyFilter':
            return { ...state, filter: action.payload };
        default:
            return { ...state };
    }
};
