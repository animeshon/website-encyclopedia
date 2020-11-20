import React from 'react';

import Router from 'next/router';

import ServerCookies from 'cookies';
import ClientCookies from 'cookie-cutter';

export const SafeSearch = (ctx) => {
    var isSafeSearch = true;
    if (!ctx.req) {
        isSafeSearch = ClientCookies().get('images.adult.enabled')?.toLowerCase() != "true";
    } else if (ctx.req.headers?.cookie) {
        const cookies = new ServerCookies(ctx.req);
        isSafeSearch = cookies?.get('images.adult.enabled')?.toLowerCase() != "true";
    }

    return isSafeSearch;
}

const SetSafeSearch = (yes) => {
    ClientCookies.set('images.adult.enabled', yes ? 'false' : 'true', { path: '/' });
}

export const UserContext = React.createContext({});

export const userReducer = (state, action) => {
    switch (action.type) {
        case 'setSafeSearch':
            SetSafeSearch(action.payload);
            //Router.reload();
            return { ...state, safeSearch: action.payload};
        default:
            return { ...state };
    }
};
