import React, { useContext, useState, useEffect } from 'react';
import Image from '@/models/image'

import LazyLoad from 'react-lazy-load';

import { UserContext } from '@/ctx/User';
import { useContainer } from '@/components/Container';

import Button from '@/components/Button';

import { Age } from '@/utilities/Restriction';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

// TODO use next/image as soon as https://github.com/vercel/next.js/discussions/18739 is resolved
// https://nextjs.org/docs/api-reference/next/image

const SafeImage = ({ image, altText, force = false, parent = undefined, displayButton = false, fallback = `${ASSET_PREFIX}/images/default-profile-picture.jpg` }) => {
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const img = image || new Image(fallback);

    const { user, dispatchUser } = useContext(UserContext);
    const isCensored = user.safeSearch && (img.IsAdult() || force);

    useEffect(() => {
        setHeight(parent ? parent.current.clientHeight : 0);
        setWidth(parent ? parent.current.clientWidth : 0);
        setLoaded(true);
    }, []);

    const onClick = e => {
        dispatchUser({
            type: 'setSafeSearch',
            payload: false,
        })
    };
    return (
            <LazyLoad offset={300} throttle={0}>

                {loaded && <>
                    {isCensored ? <picture>
                        {/* if censored, display censored image */}
                        <img src={img.GetSafeURL("", width, height, isCensored)} alt={altText} />
                        {displayButton ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
                    </picture> :
                        <picture>
                            {/* WEBP */}
                            <source srcSet={img.GetURL("WEBP", width, height)} type="image/webp" alt={altText} />
                            {/* default */}
                            <img src={img.GetURL("", width, height)} alt={altText} />
                        </picture>}

                </>}
            </LazyLoad >
    )
}

export default SafeImage;