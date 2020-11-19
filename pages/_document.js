import Document, { Html, Head, Main, NextScript } from 'next/document'

const TRACKING_ID = process.env.GTM_TRACKING_ID || 'GTM-NRN5LVP';

export default class AnimeshonDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    {/* Google Tag Manager */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${TRACKING_ID}');`,
                        }}
                    />
                    {/* End Google Tag Manager */}
                </Head>
                <body>
                    {/* Google Tag Manager (noscript) */}
                    <noscript
                        dangerouslySetInnerHTML={{
                            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${TRACKING_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                        }}
                    />
                    {/* End Google Tag Manager (noscript) */}
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}