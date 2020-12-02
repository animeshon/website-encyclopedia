import React from 'react';

import SafeImage from '@/components/SafeImage';

const ProfileImage = ({ image, altText }) => {
    return (
        <div className="product-cover">
            <figure className="product-cover__image">
                <SafeImage image={image} altText={altText} force={true} displayButton={true}/>
            </figure>
        </div>
    );
};

export default ProfileImage;
