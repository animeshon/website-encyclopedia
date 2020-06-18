// high order libraries
import React from 'react';
import App from 'next/app';

// Apollo Client for GraphQL
// import withApollo from 'next-with-apollo';
// import { ApolloProvider } from '@apollo/react-hooks';
// import ApolloClient, { InMemoryCache } from 'apollo-boost';

// components
import Header from '../components/Header';

// reset and grid css
import '../theme/styles/reset.css';
import '../theme/styles/grid.css';
import '../theme/styles/common.css';
import '../node_modules/flagpack/dist/flagpack.css';

class Animeshon extends App {
    render() {
        const { Component, pageProps, apollo } = this.props;
        return (
            <>
                {/* <ApolloProvider client={apollo}> */}
                <Header />
                <Component {...pageProps} />
                {/* </ApolloProvider> */}
            </>
        );
    }
}

// export default withApollo(({ initialState }) => {
//     return new ApolloClient({
//         uri: 'https://rickandmortyapi.com/graphql/',
//         cache: new InMemoryCache().restore(initialState || {}),
//     });
// })(Animeshon);

export default Animeshon;
