import React from 'react';
import SafeImage from '@/components/SafeImage';

export const CardImage = ({ image, gender, altText, forceSafe = true, className = "card__image" }) => {
    const fallback = image === '' || image === undefined
        ? gender === 'FEMALE'
            ? '/images/user-female-default.png'
            : '/images/user-male-default.png'
        : undefined;
        
    return (<figure className={className}>
        {image && <SafeImage image={image} altText={altText} force={forceSafe}/>}
        {fallback && <img src={fallback} alt={altText}/>}
    </figure>);
};

export default CardImage;
