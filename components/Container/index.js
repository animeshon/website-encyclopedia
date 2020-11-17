import React, { Component } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Head from 'next/head';

import BannerImage from '@/components/BannerImage';
import ProfileImage from '@/components/ProfileImage';
import TabNavigation from '@/components/TabNavigation';
import EntityTitle from '@/components/EntityTitle';
import Header from '@/components/Header';

import { ExecuteQuery } from '@/utilities/Query';

import ContainerQuery from '@/queries/container/Container';
import Navigation from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';


const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

{/* https://developers.google.com/search/docs/data-types/sitelinks-searchbox */ }
const GoogleSearchScript = `{"@context":"https://schema.org","@type":"WebSite","url":"https://animeshon.com/","potentialAction":{"@type":"SearchAction","target":"https://animeshon.com/e/search?q={search_term_string}","query-input":"required name=search_term_string"}}`;

const Container = ({ container, seo, children }) => {
    // ! TODO: The following trick seems to be not very clean.
    const { route, asPath } = useRouter();
    const selectedLabel = container.navigation.filter(i => route === i.href)[0].label;

    // ! TODO: The following code isn't really reliable and should be refactored.
    const path = asPath.split('/').slice(3).join('/');
    const url = seo.baseurl + uri.Rewrite(container.type, container.title, container.id, path);
    const canonical = seo.baseurl + asPath.split('/').slice(0, 3).join('/');

    return (
        <div>
            <Head>
                <title>{seo.title} - {selectedLabel} | {seo.type} - {seo.site}</title>
                {canonical ? (<link rel="canonical" href={canonical} />) : undefined}

                {/* SEO */}
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {seo.description ? (<meta name="description" content={seo.description} />) : undefined}
                {seo.rating ? (<meta name="rating" content={seo.rating} />) : undefined}

                {/* Social Media & SEO */}
                <meta property="og:site_name" content="Animeshon Encyclopedia"></meta>
                <meta property="og:title" content={`${seo.title} - ${selectedLabel} | ${seo.type}`} />
                {seo.description ? (<meta property="og:description" content={seo.description} />) : undefined}
                {seo.image ? (<meta property="og:image" content={seo.image} />) : undefined}
                {url ? <meta property="og:url" content={url} /> : undefined }

                {/* Twitter */}
                <meta name="twitter:card" content={seo.image ? 'summary_large_image' : 'summary'} />
                <meta name="twitter:site" content="@AnimeshonSNS" />
                {seo.twitter ? (<meta name="twitter:creator" content={seo.twitter} />) : undefined}
                {seo.image ? (<meta name="twitter:image:alt" content={seo.title} />) : undefined}

                {/* Facebook */}
                {/* <meta property="fb:app_id" content="your_app_id" /> */}

                {/* Google */}
                <meta name="google" content="nositelinkssearchbox" />
                <script type={"application/ld+json"} dangerouslySetInnerHTML={{ __html: GoogleSearchScript }} />
            </Head>
            <div className="any">
                <Header isSearchAvailable />
                <BannerImage
                    title={container.title}
                    altText={container.title}
                    bannerImage={container.bannerImage}
                    breadcrumb={[container.type, container.title, selectedLabel]}
                />
                <TabNavigation items={container.navigation} selected={container.selected} />
                <div className="any-landing container">
                    <div className="any-landing__cover">
                        <ProfileImage
                            altText={container.title}
                            profileImage={container.profileImage}
                        />
                    </div>
                    <div className="product-page-offset">
                        <Mobile>
                            <EntityTitle title={container.title} />
                        </Mobile>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

// HOC best practice https://it.reactjs.org/docs/higher-order-components.html
export function withContainer(WrappedComponent) {
    class witContainer extends Component {
        constructor(props) {
            super(props)
        }

        //static getInitialProps = WrappedComponent.getInitialProps

        static async getInitialProps(ctx) {
            const type = ctx.pathname.split('/')[1];
            const { id } = ctx.query;
            const data = await ExecuteQuery(ctx, { id: id }, ContainerQuery(type), (data, error) => { return data.result; });

            // Get component’s props
            let componentProps = {}
            if (WrappedComponent.getInitialProps) {
                componentProps = await WrappedComponent.getInitialProps(ctx);
            }

            const container = {
                id: data.id,
                type: data.__typename,
                title: locale.EnglishAny(data.names),
                bannerImage: image.Cover(data.images),
                profileImage: image.ProfileAny(data.images),
                navigation: Navigation(type, locale.EnglishAny(data.names), data.id),
            };

            const seo = {
                type: data.__typename, // ! TODO: Switch properly the type in order to show "VisualNovel" as "Visual Novel".
                rating: undefined, // ! TODO: Valid values are ['general' 'mature' 'restricted' 'adult' '14 years' 'safe for kids'].
                twitter: undefined, // TODO: This is a nice to have features, but not that useful.
                
                description: text.Truncate(locale.EnglishAny(data.descriptions), 160),
                title: text.Truncate(container.title, 32),
                image: container.profileImage,

                site: process.env.WEBSITE_NAME || 'Animeshon Encyclopedia',
                baseurl: process.env.WEBSITE_BASEURL || 'http://127.0.0.1:3000',
            }

            return {
                container: container,
                seo: seo,
                ...componentProps
            };
        }

        render() {
            const { container, seo, ...passThroughProps } = this.props;
            return (
                <Container container={container} seo={seo}>
                    <WrappedComponent {...passThroughProps} />
                </Container>
            )
        }
    }

    witContainer.staticMethod = WrappedComponent.staticMethod;
    return witContainer;
}

export default withContainer;
