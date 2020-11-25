import React, { useContext } from 'react';
import Image from 'next/image'
import { UserContext } from '@/ctx/User';
import { useContainer } from '@/components/Container';

import Button from '@/components/Button';

import { Age } from '@/utilities/AgeRating';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const censor = (image, force, container) => {
    const age = image ? Age(image.ratings) : undefined;
    return age !== undefined ? age > 17 : (force && container.adult);
}

const SafeImage = ({ image, altText, force = true, displayButton = false }) => {
    const { user, dispatchUser } = useContext(UserContext);
    const container = useContainer();
    const isCensored = user.safeSearch && censor(image, force, container);
    const img = image ? image.uri : `${ASSET_PREFIX}/images/default-profile-picture.jpg`;

    const onClick = e => {
        dispatchUser({
            type: 'setSafeSearch',
            payload: false,
        })
    };
    return (<>
        <img src={isCensored ? `${ASSET_PREFIX}/images/adult-only-warning.jpg` : img} alt={altText} />
        {isCensored && displayButton ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
    </>)
}

export default SafeImage;