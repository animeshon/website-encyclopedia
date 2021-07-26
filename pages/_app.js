// high order libraries
import React, { useContext, useReducer, useEffect, useRef } from 'react';
import Head from 'next/head';
import App from 'next/app';

import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from "../lib/apolloClient";

import { SearchContext, searchReducer } from '@/ctx/Search';
import { LanguageContext, languageReducer } from '@/ctx/Languages';
import { UserContext, userReducer, SafeSearch } from '@/ctx/User';

// reset and grid css
import '../theme/styles/reset.css';
import '../theme/styles/grid.css';
import '../theme/styles/common.css';
import '../node_modules/flagpack/dist/flagpack.css';

import Router from 'next/router';
import LoadingBar from 'react-top-loading-bar'

import countries from 'i18n-iso-countries';
import languages from '@cospired/i18n-iso-languages';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
languages.registerLocale(require("@cospired/i18n-iso-languages/langs/en.json"));

const Animeshon = ({ pageProps, Component, safeSearch }) => {
    const apolloClient = useApollo(pageProps.initialApolloState);

    // loading bar
    // ! for issues: https://github.com/klendi/react-top-loading-bar
    const ref = useRef(null)

    //Binding events for loading bar
    Router.events.on('routeChangeStart', () => ref.current?.continuousStart());
    Router.events.on('routeChangeComplete', () => ref.current?.complete());
    Router.events.on('routeChangeError', () => ref.current?.complete());

    const [search, dispatchSearch] = useReducer(searchReducer, {});
    const [language, dispatchLanguage] = useReducer(languageReducer, 'en-US');
    const [user, dispatchUser] = useReducer(userReducer, { safeSearch: safeSearch });

    useEffect(() => {
        const lang = navigator.language;
        const finalLang = lang.includes('ja-JP') ? 'ja-JP' : 'en-US';

        dispatchLanguage({
            type: 'setLanguage',
            payload: finalLang,
        });
    }, [language, dispatchLanguage]);

    return (
        <ApolloProvider client={apolloClient}>
            <UserContext.Provider value={{ user, dispatchUser }}>
                <LanguageContext.Provider value={{ language, dispatchLanguage }}>
                    <SearchContext.Provider value={{ search, dispatchSearch }}>
                        <Head>
                            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        </Head>
                        <LoadingBar color="#f11946" ref={ref} shadow={true} />
                        <Component {...pageProps} />
                    </SearchContext.Provider>
                </LanguageContext.Provider>
            </UserContext.Provider>
        </ApolloProvider>
    );
};

Animeshon.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext);
    var isSafeSearch = SafeSearch(appContext.ctx);

    return { safeSearch: isSafeSearch, ...appProps };
};

export default Animeshon;
