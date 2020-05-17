// high order libraries
import React from 'react';
import App from 'next/app';

// components
import Header from '../components/Header';

// THEME
// typography
import { font } from '../theme/font';

// reset and grid css
import '../theme/styles/reset.css';
import '../theme/styles/grid.css';
import '../theme/styles/common.css';
import '../node_modules/flagpack/dist/flagpack.css';

// helper functions
import { capitalize } from '../helpers/capitalize';

class Animeshon extends App {
    render() {
        const { Component, pageProps } = this.props;
        const { family, weights, styles } = font;
        return (
            <>
                <Header />
                <Component {...pageProps} />
                <style jsx>{`
                    @font-face {
                        font-family: '${capitalize(family)}';
                        src: url('/fonts/${family}/${capitalize(
                    family,
                )}-Light.ttf')
                            format('truetype');
                        font-style: ${styles.normal};
                        font-weight: ${weights.light};
                    }
                    @font-face {
                        font-family: '${capitalize(family)}';
                        src: url('/fonts/${family}/${capitalize(
                    family,
                )}-LightItalic.ttf')
                            format('truetype');
                        font-style: ${styles.italic};
                        font-weight: ${weights.light};
                    }
                    @font-face {
                        font-family: '${capitalize(family)}';
                        src: url('/fonts/${family}/${capitalize(
                    family,
                )}-Regular.ttf')
                            format('truetype');
                        font-style: ${styles.normal};
                        font-weight: ${weights.regular};
                    }
                    @font-face {
                        font-family: '${capitalize(family)}';
                        src: url('/fonts/${family}/${capitalize(
                    family,
                )}-Italic.ttf')
                            format('truetype');
                        font-style: ${styles.italic};
                        font-weight: ${weights.regular};
                    }
                    @font-face {
                        font-family: '${capitalize(family)}';
                        src: url('/fonts/${family}/${capitalize(
                    family,
                )}-Bold.ttf')
                            format('truetype');
                        font-style: ${styles.normal};
                        font-weight: ${weights.bold};
                    }
                    @font-face {
                        font-family: '${capitalize(family)}';
                        src: url('/fonts/${family}/${capitalize(
                    family,
                )}-BoldItalic.ttf')
                            format('truetype');
                        font-style: ${styles.italic};
                        font-weight: ${weights.bold};
                    }

                    :global(html) {
                        font-family: 'Roboto', 'Helvetica-Neue', Helvetica,
                            Arial, sans-serif;
                        font-style: normal;
                        font-weight: 400;
                    }

                    :global(b) {
                        font-weight: 700;
                    }

                    :global(p) {
                        line-height: 1.5;
                    }
                `}</style>
            </>
        );
    }
}

export default Animeshon;
