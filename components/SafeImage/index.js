import React, { useContext } from 'react';
import Image from 'next/image'
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
        return images[i].image.files[j].publicUri;
    }
} 

const censor = (image, force, container) => {
    const age = image ? Age(image.ratings) : undefined;
    return age !== undefined ? age > 17 : (force && container.adult);
}

// TODO use next/image as soon as https://github.com/vercel/next.js/discussions/18739 is resolved
// https://nextjs.org/docs/api-reference/next/image

const SafeImage = ({ image, altText, force = true, displayButton = false }) => {
    const { user, dispatchUser } = useContext(UserContext);
    const container = useContainer();
    const isCensored = user.safeSearch && censor(image, force, container);
    const img = image ? getURIByFormat(image, 'PNG') : `${ASSET_PREFIX}/images/default-profile-picture.jpg`;
    const webP = image ? getURIByFormat(image, 'WEBP') : undefined

    const onClick = e => {
        dispatchUser({
            type: 'setSafeSearch',
            payload: false,
        })
    };
    return (<picture>
        {/* if censored, display censored image */}
        {isCensored ? <img src={`${ASSET_PREFIX}/images/adult-only-warning.jpg`} alt={altText} /> : undefined}
        {/* WEBP */}
        {webP ? <source srcset="img/awesomeWebPImage.webp" type="image/webp" alt={altText}/> : undefined}
        {/* default (PNG) */}
        <img src={img} alt={altText}/>
        {/* if censored and can show button, show button */}
        {isCensored && displayButton ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
    </picture>)
}

export default SafeImage;