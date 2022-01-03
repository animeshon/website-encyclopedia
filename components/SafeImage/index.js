import React, { useContext, useState, useEffect } from 'react';
import Image from '@/models/image'

import LazyLoad from 'react-lazy-load';

import { UserContext } from '@/ctx/User';
import { useContainer } from '@/components/Container';

import Button from '@/components/Button';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const censor = (image, force, container) => {
    return image ? image.IsAdult() : (force && container.adult);
}

// TODO use next/image as soon as https://github.com/vercel/next.js/discussions/18739 is resolved
// https://nextjs.org/docs/api-reference/next/image

const SafeImage = ({ image, altText, force = false, displayButton = false, fallback = `${ASSET_PREFIX}/images/default-profile-picture.jpg` }) => {
    const { user, dispatchUser } = useContext(UserContext);
    // const container = useContainer();
    const isCensored = user.safeSearch && (image.IsAdult() || force );

    const onClick = e => {
        dispatchUser({
            type: 'setSafeSearch',
            payload: false,
        })
    };
    return (
        <LazyLoad offset={300} throttle={0}>
            {isCensored ? <picture>
                {/* if censored, display censored image */}
                <img src={`${ASSET_PREFIX}/images/adult-only-warning.jpg`} alt={altText} />
                {displayButton ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
            </picture> :
                <picture>
                    {/* WEBP */}
                    {image.GetURL() ? <source srcSet={image.GetURL()} type="image/webp" alt={altText} /> : undefined}
                    {/* default (PNG) */}

                    <img src={image.GetURL()} alt={altText} />
                </picture>}
        </LazyLoad >
    )
}

export default SafeImage;