// high order libraries
import React, { useContext, useReducer } from 'react';
import App from 'next/app';

// Apollo Client for GraphQL
// import withApollo from 'next-with-apollo';
// import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';

import { SearchContext, searchReducer } from '@/ctx/search';

// reset and grid css
import '../theme/styles/reset.css';
import '../theme/styles/grid.css';
import '../theme/styles/common.css';
import '../node_modules/flagpack/dist/flagpack.css';

const Animeshon = ({ pageProps, Component }) => {
    const [search, dispatchSearch] = useReducer(searchReducer, {});
    return (
        <>
            {/* <ApolloProvider client={apollo}> */}
            <SearchContext.Provider value={{ search, dispatchSearch }}>
                <Component {...pageProps} />
            </SearchContext.Provider>
            {/* </ApolloProvider> */}
        </>
    );
};

// export default withApollo(({ initialState }) => {
//     return new ApolloClient({
//         uri: 'https://rickandmortyapi.com/graphql/',
//         cache: new InMemoryCache().restore(initialState || {}),
//     });
// })(Animeshon);

export default Animeshon;
