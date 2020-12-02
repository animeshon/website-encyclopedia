import React, { useContext } from 'react';
import Image from 'next/image'
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';


import { UserContext } from '@/ctx/User';
import { useContainer } from '@/components/Container';

import Button from '@/components/Button';

import { Age } from '@/utilities/AgeRating';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const getURIByFormat = (image, reqFormat) => {
    if (image === undefined || image === null) {
        return undefined;
    }
    if (image.files === undefined || image.files === null) {
        return undefined;
    }

    for (var j = 0; j < image.files.length; j++) {
        const format = image.files[j].format;
        if (!format || format != reqFormat) {
            continue;
        }
        return image.files[j].publicUri;
    }
    return undefined;
}

const censor = (image, force, container) => {
    const age = image ? Age(image.ratings) : undefined;
    return age !== undefined ? age > 17 : (force && container.adult);
}

// TODO use next/image as soon as https://github.com/vercel/next.js/discussions/18739 is resolved
// https://nextjs.org/docs/api-reference/next/image

const SafeImage = ({ image, altText, force = true, displayButton = false, fallback = `${ASSET_PREFIX}/images/default-profile-picture.jpg` }) => {
    const { user, dispatchUser } = useContext(UserContext);
    const container = useContainer();
    const isCensored = user.safeSearch && censor(image, force, container);
    const img = image ? getURIByFormat(image, 'PNG') : fallback;
    const webP = image ? getURIByFormat(image, 'WEBP') : undefined

    const onClick = e => {
        dispatchUser({
            type: 'setSafeSearch',
            payload: false,
        })
    };
    return (
        isCensored ? <picture>
            {/* if censored, display censored image */}
            <img src={`${ASSET_PREFIX}/images/adult-only-warning.jpg`} alt={altText} className="lazyload" />
            {displayButton ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
        </picture> :
            <picture>
                {/* WEBP */}
                {webP ? <source srcset={webP} type="image/webp" alt={altText} /> : undefined}
                {/* default (PNG) */}
                <img src={img} alt={altText} className="lazyload" />
            </picture>
    )
}

export default SafeImage;