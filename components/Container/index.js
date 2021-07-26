import React, { Component, useContext } from 'react';
import { Context, useMediaQuery } from 'react-responsive';
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
import Navigation from '@/components/TabNavigation/navigation';
import EntityTitle from '@/components/EntityTitle';
import Header from '@/components/Header/Header';
import FabEnciclopedia from '@/components/Fab/FabEnciclopedia';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

import ContainerQuery from '@/queries/container/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';
import { WebMetaTag, IsAdultOnly } from "@/utilities/Restriction"

import { ContainerContext } from '@/ctx/Container';

import { DeleteUndefined } from '@/root/lib/server-side';
import { initializeApollo } from "@/root/lib/apolloClient";

import styles from './Container.module.css';

import Entity from '@/models/entity';

const WEBSITE_NAME = process.env.NEXT_PUBLIC_WEBSITE_NAME || 'Animeshon';

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

const Container = ({ container, seo, children }) => {
    const title = `${seo.title} - ${container.selectedLabel} | ${seo.media}`;
    const shareTitle = `${seo.site} | ${title}`
    const description = seo.description ? seo.description : undefined;
    const hashtags = ['animeshon', `${seo.media}`];

    const name = container.model.GetNames().Get();

    return (
        <div>
            <Head>
                <title>{seo.title} - {container.selectedLabel} | {seo.media} - {seo.site}</title>
                <link rel="canonical" href={seo.canonical} />

                {/* SEO */}
                {description ? (<meta name="description" content={description} />) : undefined}
                {seo.rating ? (<meta name="rating" content={seo.rating} />) : undefined}

                {/* Social Media & SEO */}
                <meta property="og:site_name" content={seo.site}></meta>
                <meta property="og:title" content={title} />
                {description ? (<meta property="og:description" content={description} />) : undefined}
                {seo.image ? (<meta property="og:image" content={getImage(seo.image)} />) : undefined}
                <meta property="og:url" content={seo.url} />

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
                    title={name}
                    altText={name}
                    image={container.model.GetBannerUrl()}
                    breadcrumb={[container.model.GetType(), container.model.GetSubtype(), name, container.selectedLabel]}
                />
                <TabNavigation items={container.navigation} selected={container.selectedLabel} />
                <div className="any-landing container">
                    <div className="any-landing__cover">
                        <ProfileImage
                            altText={name}
                            image={container.model.GetCoverUrl()}
                        >
                            {container.isMinorR18Illegal && (
                                <p className={styles.consorship}>Censorship is courtesy of the U.N.
                                    <a target="_blank" href={`https://en.wikipedia.org/wiki/Legal_status_of_fictional_pornography_depicting_minors`}><BiLinkExternal /></a>
                                    <a target="_blank" href={`https://www.ohchr.org/Documents/HRBodies/CRC/CRC.C.156_OPSC%20Guidelines.pdf`}><BiLinkExternal /></a>
                                </p>

                            )}
                        </ProfileImage>
                        <div className={styles.share_buttons}>
                            <FacebookShareButton url={seo.canonical} hashtags={hashtags}><FacebookIcon size={32} round={true} /></FacebookShareButton>
                            <TwitterShareButton url={seo.canonical} title={shareTitle} hashtags={hashtags} ><TwitterIcon size={32} round={true} /></TwitterShareButton>
                            <LineShareButton url={seo.canonical} title={shareTitle}><LineIcon size={32} round={true} /></LineShareButton>
                            <RedditShareButton url={seo.canonical} title={shareTitle}><RedditIcon size={32} round={true} /></RedditShareButton>
                            <TelegramShareButton url={seo.canonical} title={shareTitle}><TelegramIcon size={32} round={true} /></TelegramShareButton>
                            <WhatsappShareButton url={seo.canonical} title={shareTitle}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
                        </div>
                    </div>
                    <div className="product-page-offset">
                        <Mobile>
                            <EntityTitle key={name} title={name} />
                        </Mobile>
                        {children}
                    </div>
                    <FabEnciclopedia />
                </div>
            </div>
        </div>
    );
};

export function withContainerProps(getServerSidePropsFunc) {
    return async (ctx) => {
        // Id gets encoded in collection.id, we need therefore to replace "." with "/" to get the resource name
        const id = ctx.query.id.replace(".", "/");

        // ! TODO use a query for a more reliable guess
        const apolloClient = initializeApollo();
        const containerData = await ExecuteQuery(apolloClient, PrepareQuery({ id: id }, ContainerQuery()));

        // Get component’s props
        let componentProps = getServerSidePropsFunc && await getServerSidePropsFunc(ctx, apolloClient);
        return {
            props: DeleteUndefined({
                containerData,
                ...componentProps
            })
        };
    }
}


// HOC best practice https://it.reactjs.org/docs/higher-order-components.html
const withContainer = (WrappedComponent) => {
    return ({ containerData, ...passThroughProps }) => {
        const model = new Entity(containerData);
        model.Localize();

        // ! TODO: The following trick seems to be not very clean.
        // ! NOTE: asPath returns different values for the client-side and server-side.
        const { pathname } = useRouter();

        const subpath = pathname.split('/').slice(3).join('/');
        const navigation = Navigation(model.type, model.GetNames().Get(), model.GetID());
        const selectedLabel = navigation.find(i => subpath === i.key)?.label || "";

        const container = {
            model,
            navigation,
            selectedLabel
        };

        const seo = {
            media: model.GetFullTypeString(),
            rating: WebMetaTag(containerData.maturityRatings),
            twitter: undefined, // TODO: This is a nice to have features, but not that useful.

            description: model.GetDescription(160),
            title: text.Truncate(model.GetNames().Get(), 64),
            image: model.GetCoverUrl(),

            url: model.GetURI(subpath, true),
            canonical: model.GetCanonicalURI(subpath),

            site: WEBSITE_NAME,
        }

        return (<ContainerContext.Provider value={container}>
            <Container container={container} seo={seo} >
                <WrappedComponent {...passThroughProps} />
            </Container>
        </ContainerContext.Provider>)
    }
}

export const useContainer = () => {
    const context = useContext(ContainerContext);
    if (context === undefined) {
        throw new Error('useContainer can only be used inside ContainerContext');
    }
    return context;
}


export default withContainer;
