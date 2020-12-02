import React from 'react';

import SafeImage from '@/components/SafeImage';

const ProfileImage = ({ image, altText }) => {
    return (
        <div className="product-cover">
            <SafeImage image={image} altText={altText} force={true} displayButton={true} className="product-cover__image" />
        </div>
    );
};

export default ProfileImage;
