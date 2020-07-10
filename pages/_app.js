// high order libraries
import React, { useContext, useReducer, useEffect } from 'react';
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
import '../node_modules/flagpack/dist/flagpack.css';

const Animeshon = ({ pageProps, Component, apollo }) => {
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
        uri: httpLin'http://graphql.animeshon.com/graphql'k,
        cache: cache.restore(initialState || {}),
    });
})(Animeshon);

// kubectl port-forward dgraph-alpha-0 -n animeshon 8080:8080
