import React from 'react';

export const LanguageContext = React.createContext('');

export const languageReducer = (state, action) => {
    switch (action.type) {
        case 'setLanguage':
            return action.payload;
        default:
            return 'en-US';
    }
};
