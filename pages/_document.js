import Document, { Html, Head, Main, NextScript } from 'next/document'

const TAG_MANAGER_ID = process.env.NEXT_PUBLIC_TAG_MANAGER_ID || 'GTM-NRN5LVP';
const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

{/* https://developers.google.com/search/docs/data-types/sitelinks-searchbox */ }
const GoogleSearchScript = `{"@context":"https://schema.org","@type":"WebSite","url":"https://animeshon.com/","potentialAction":{"@type":"SearchAction","target":"https://animeshon.com/e/search?q={search_term_string}","query-input":"required name=search_term_string"}}`;

const GoogleTagManager = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${TAG_MANAGER_ID}');`;
const GoogleTagManagerNoScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=${TAG_MANAGER_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

const IubendCookieSolution = `var _iub = _iub || []; _iub.csConfiguration = {"countryDetection":true,"perPurposeConsent":true,"whitelabel":false,"lang":"en","siteId":1905535,"cookiePolicyId":48776658, consentOnContinuedBrowsing: false, "banner":{ "acceptButtonDisplay":true,"customizeButtonDisplay":true,rejectButtonDisplay: true,"position":"bottom" }};`;
export default class AnimeshonDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href={`${ASSET_PREFIX}/brand/favicon.ico`} type="image/x-icon" />
                    {/* NOTE: Anti-flicker has to be actived once we start using Google Optimize, especially for A/B testing */}

                    {/* Anti-flicker snippet (recommended) */}
                    {/* <style
                        dangerouslySetInnerHTML={{
                            __html: `.async-hide { opacity: 0 !important}`,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;})(window,document.documentElement,'async-hide','dataLayer',4000,{'${TAG_MANAGER_ID}':true});`,
                        }}
                    /> */}
                    {/* Google Tag Manager */}
                    <script dangerouslySetInnerHTML={{ __html: GoogleTagManager }} />
                    {/* End Google Tag Manager */}
                    {/* Google Searchbox */}
                    <meta name="google" content="nositelinkssearchbox" />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: GoogleSearchScript }} />
                    {/* End Google Searchbox */}
                </Head>
                <body>
                    {/* Google Tag Manager (noscript) */}
                    <noscript dangerouslySetInnerHTML={{ __html: GoogleTagManagerNoScript }} />
                    {/* End Google Tag Manager (noscript) */}
                    <Main />
                    <NextScript />
                    {/* Iubenda Cookie Solution */}
                    <script dangerouslySetInnerHTML={{ __html: IubendCookieSolution }} />
                    <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charSet="UTF-8" async={true} />
                    {/* End Iubenda Cookie Solution */}
                </body>
            </Html>
        )
    }
}