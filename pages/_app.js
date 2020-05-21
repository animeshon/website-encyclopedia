// high order libraries
import React from 'react';
import App from 'next/app';

// components
import Header from '../components/Header';

// reset and grid css
import '../theme/styles/reset.css';
import '../theme/styles/grid.css';
import '../theme/styles/common.css';
import '../node_modules/flagpack/dist/flagpack.css';

class Animeshon extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Header />
                <Component {...pageProps} />
            </>
        );
    }
}

export default Animeshon;
