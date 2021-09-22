import React, { useRef } from 'react';
import SafeImage from '@/components/SafeImage';

import styles from './CardImage.module.css';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

export const CardImage = ({ image, gender, altText, className = styles.card__image }) => {
    const thisRef = useRef(null);
    const fallback = image === '' || image === undefined
        ? gender === 'FEMALE'
            ? `${ASSET_PREFIX}/images/user-female-default.png`
            : `${ASSET_PREFIX}/images/user-male-default.png`
        : undefined;

    return (<figure ref={thisRef} className={className}>
        <SafeImage image={image} altText={altText} parent={thisRef} fallback={fallback} />
    </figure>);
};

export default CardImage;
