import React from 'react';

export const SearchContext = React.createContext({});

export const searchReducer = (state, action) => {
    switch (action.type) {
        case 'performNewSearch':
            return { ...state, search: action.payload };
        default:
            return { ...state };
    }
};
