// high order libraries
import React, { useContext, useReducer, useEffect, useRef  } from 'react';
import App from 'next/app';

import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from './../introspection/fragments.generated.json';

import { SearchContext, searchReducer } from '@/ctx/search';
import { LanguageContext, languageReducer } from '@/ctx/languages';

// reset and grid css
import '../theme/styles/reset.css';
import '../theme/styles/grid.css';
import '../theme/styles/common.css';
import '../theme/styles/coming-soon.css';
import '../node_modules/flagpack/dist/flagpack.css';

import Router from 'next/router';
import LoadingBar from 'react-top-loading-bar'


const Animeshon = ({ pageProps, Component, apollo }) => {
    // loading bar
    // ! for issues: https://github.com/klendi/react-top-loading-bar
    const ref = useRef(null)

    //Binding events for loading bar
    Router.events.on('routeChangeStart', () => ref.current?.continuousStart()); 
    Router.events.on('routeChangeComplete', () => ref.current?.complete()); 
    Router.events.on('routeChangeError', () => ref.current?.complete());
    
    const [search, dispatchSearch] = useReducer(searchReducer, {});
    const [language, dispatchLanguage] = useReducer(languageReducer, 'en-US');

    useEffect(() => {
        const lang = navigator.language;
        const finalLang = lang.includes('ja-JP') ? 'ja-JP' : 'en-US';

        dispatchLanguage({
            type: 'setLanguage',
            payload: finalLang,
        });
    }, [language, dispatchLanguage]);

    return (
        <ApolloProvider client={apollo}>
            <LanguageContext.Provider value={{ language, dispatchLanguage }}>
                <SearchContext.Provider value={{ search, dispatchSearch }}>
                    <LoadingBar color="#f11946" ref={ref} shadow={true} />
                    <Component {...pageProps} />
                </SearchContext.Provider>
            </LanguageContext.Provider>
        </ApolloProvider>
    );
};

Animeshon.getInitialProps = async appContext => {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
};

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

export default withApollo(({ initialState }) => {
    return new ApolloClient({
        uri: process.env.GRAPHQL_ENDPOINT || 'http://127.0.0.1:8080/graphql',
        cache: cache.restore(initialState || {}),
    });
})(Animeshon);
