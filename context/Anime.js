import React from 'react';

export const AnimeContext = React.createContext({});

export const animeReducer = (state, action) => {
    switch (action.type) {
        case 'saveActualAnime':
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};
