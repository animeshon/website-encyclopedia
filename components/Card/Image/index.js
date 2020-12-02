import React from 'react';
import SafeImage from '@/components/SafeImage';

import styles from './CardImage.module.css';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

export const CardImage = ({ image, gender, altText, forceSafe = true, className = styles.card__image }) => {
    const fallback = image === '' || image === undefined
        ? gender === 'FEMALE'
            ? `${ASSET_PREFIX}/images/user-female-default.png`
            : `${ASSET_PREFIX}/images/user-male-default.png`
        : undefined;
    
    return (<figure className={className}>
        <SafeImage image={image} altText={altText} force={forceSafe} fallback={fallback}/>
    </figure>);
};

export default CardImage;
