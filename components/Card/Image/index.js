import React from 'react';

export const CardImageGender = ({ picture, sex, altText, className = "card__image" }) => {
    const image = picture === '' || picture === undefined
        ? sex === 'FEMALE'
            ? '/images/user-female-default.png'
            : '/images/user-male-default.png'
        : picture;
    return (<CardImage picture={image} altText={altText} className={className} />);
};

const CardImage = ({ picture, fallback, altText, className = "" }) => {
    const image =
        picture === '' || picture === undefined ? fallback : picture

    return (
        <figure className={className}>
            <img src={image} alt={altText} />
        </figure>
    );
};

export default CardImage;
