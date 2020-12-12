import React, { Component, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
    FacebookShareButton, TwitterShareButton, RedditShareButton, TelegramShareButton, WhatsappShareButton, LineShareButton,
    TwitterIcon, FacebookIcon, RedditIcon, TelegramIcon, WhatsappIcon, LineIcon
} from 'react-share';

import { BiLinkExternal } from 'react-icons/bi';

import BannerImage from '@/components/BannerImage';
import ProfileImage from '@/components/ProfileImage';
import TabNavigation from '@/components/TabNavigation';
import EntityTitle from '@/components/EntityTitle';
import Header from '@/components/Header/Header';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import ContainerQuery from '@/queries/container/Container';
import Navigation from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';
import * as media from '@/utilities/MediaType';
import * as rating from '@/utilities/AgeRating';

import { ContainerContext } from '@/ctx/Container';

import styles from './Container.module.css';

const WEBSITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME || 'Animeshon Encyclopedia';

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

const Container = ({ container, seo, children }) => {
    // ! TODO: The following trick seems to be not very clean.
    // ! NOTE: asPath returns different values for the client-side and server-side.
    const { pathname, query } = useRouter();

    const subpath = pathname.split('/').slice(3).join('/');
    const path = uri.Rewrite(container.type, container.title, container.id, subpath);

    // ! TODO: The following code isn't really reliable and should be refactored.
    // ! Additionally, it only works client-side (selectedLabel is undefined in the server-side).
    const selectedLabel = container.navigation.filter(i => path === i.as)[0]?.label;

    const url = uri.AbsoluteURI(path);
    const canonical = uri.CanonicalURI(pathname, query.id);

    const title = `${seo.title} - ${selectedLabel} | ${seo.media}`;
    const shareTitle = `${seo.site} | ${title}`
    const description = seo.description ? seo.description : undefined;
    const hashtags = ['animeshon', `${seo.media}`];

    return (
        <div>
            <Head>
                <title>{seo.title} - {selectedLabel} | {seo.media} - {seo.site}</title>
                {canonical ? (<link rel="canonical" href={canonical} />) : undefined}

                {/* SEO */}
                {description ? (<meta name="description" content={description} />) : undefined}
                {seo.rating ? (<meta name="rating" content={seo.rating} />) : undefined}

                {/* Social Media & SEO */}
                <meta property="og:site_name" content={seo.site}></meta>
                <meta property="og:title" content={title} />
                {description ? (<meta property="og:description" content={description} />) : undefined}
                {seo.image ? (<meta property="og:image" content={seo.image.uri} />) : undefined}
                {url ? <meta property="og:url" content={url} /> : undefined}

                {/* Twitter */}
                <meta name="twitter:card" content={seo.image ? 'summary_large_image' : 'summary'} />
                <meta name="twitter:site" content="@AnimeshonSNS" />
                {seo.twitter ? (<meta name="twitter:creator" content={seo.twitter} />) : undefined}
                {seo.image ? (<meta name="twitter:image:alt" content={seo.title} />) : undefined}

                {/* Facebook */}
                {/* <meta property="fb:app_id" content="your_app_id" /> */}
            </Head>
            <div className="any">
                <Header isSearchAvailable />
                <div className="header_padder" />
                <BannerImage
                    title={container.title}
                    altText={container.title}
                    image={container.banner}
                    breadcrumb={[container.type, container.title, selectedLabel]}
                />
                <TabNavigation items={container.navigation} selected={selectedLabel} />
                <div className="any-landing container">
                    <div className="any-landing__cover">
                        <ProfileImage
                            altText={container.title}
                            image={container.image}
                        >
                        {container.isMinorR18Illegal && (
                            <p className={styles.consorship}>Censorship is courtesy of the U.N.
                            <a target="_blank" href={`https://en.wikipedia.org/wiki/Legal_status_of_fictional_pornography_depicting_minors`}><BiLinkExternal/></a>
                            <a target="_blank" href={`https://www.ohchr.org/Documents/HRBodies/CRC/CRC.C.156_OPSC%20Guidelines.pdf`}><BiLinkExternal/></a>
                            </p>
                            
                        )}
                        </ProfileImage>
                        <div className={styles.share_buttons}>
                            <FacebookShareButton url={canonical} hashtags={hashtags}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                            <TwitterShareButton url={canonical} title={shareTitle} hashtags={hashtags} ><TwitterIcon size={32} round={true} /></TwitterShareButton>
                            <LineShareButton url={canonical} title={shareTitle}><LineIcon size={32} round={true} /></LineShareButton>
                            <RedditShareButton url={canonical} title={shareTitle}><RedditIcon size={32} round={true} /></RedditShareButton>
                            <TelegramShareButton url={canonical} title={shareTitle}><TelegramIcon size={32} round={true} /></TelegramShareButton>
                            <WhatsappShareButton url={canonical} title={shareTitle}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                        </div>
                    </div>
                    <div className="product-page-offset">
                        <Mobile>
                            <EntityTitle key={container.title} title={container.title} />
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
    class withContainer extends Component {
        constructor(props) {
            super(props)
        }

        //static getInitialProps = WrappedComponent.getInitialProps

        static async getInitialProps(ctx) {
            const { id } = ctx.query;
            const type = uri.GuessType(ctx);
            const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, ContainerQuery(type)));

            // Get component’s props
            let componentProps = {}
            if (WrappedComponent.getInitialProps) {
                componentProps = await WrappedComponent.getInitialProps(ctx);
            }

            // check if the content contains the restrictions which marsk the contetn as illegal because of minor
            const isMinorR18Illegal = data.restrictions.filter(r => {return r.tag == "MINOR-R18"}).length >= 1;
            console.log(isMinorR18Illegal)

            const container = {
                id: data.id,
                type: data.__typename,
                adult: rating.IsAdultOnly(data.ageRatings),
                title: locale.EnglishAny(data.names),
                banner: image.Cover(data.images, data.ageRatings),
                image: image.ProfileAny(data.images, data.ageRatings),
                navigation: Navigation(type, locale.EnglishAny(data.names), data.id),
                isMinorR18Illegal: isMinorR18Illegal
            };

            const seo = {
                type: data.__typename,
                media: media.Type(data.__typename),
                rating: rating.WebMetaTag(data.ageRatings),
                twitter: undefined, // TODO: This is a nice to have features, but not that useful.

                description: text.Truncate(locale.EnglishAny(data.descriptions), 160),
                title: text.Truncate(container.title, 64),
                image: container.image,

                site: WEBSITE_NAME,
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
                <ContainerContext.Provider value={container}>
                    <Container container={container} seo={seo} >
                        <WrappedComponent {...passThroughProps} />
                    </Container>
                </ContainerContext.Provider>
            )
        }
    }

    withContainer.staticMethod = WrappedComponent.staticMethod;
    return withContainer;
}

export const useContainer = () => {
    const context = useContext(ContainerContext);
    if (context === undefined) {
        throw new Error('useContainer can only be used inside ContainerContext');
    }
    return context;
}


export default withContainer;
