import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import possibleTypes from './../introspection/fragments.generated.json';

let apolloClient;

// const graphqlClientEndpoint = "https://api.animeshon.com/graphql" || 'http://127.0.0.1:8080/graphql';
// const graphqlServerEndpoint = "https://api.animeshon.com/graphql" || 'http://127.0.0.1:8080/graphql';

const graphqlClientEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://127.0.0.1:8080/graphql';
const graphqlServerEndpoint = process.env.INTERNAL_GRAPHQL_ENDPOINT || 'http://127.0.0.1:8080/graphql';

function createApolloClient() {
    const ssrMode = typeof window === "undefined";
    const cache = new InMemoryCache({ possibleTypes });
    return new ApolloClient({
        ssrMode: ssrMode,
        link: new HttpLink({
            uri: ssrMode ? graphqlServerEndpoint : graphqlClientEndpoint,
        }),
        cache: cache,
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}