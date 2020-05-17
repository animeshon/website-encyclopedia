const CardImage = ({ picture, altText, sex, type }) => {
    const image =
        picture === '' || picture === undefined
            ? type === 'people'
                ? sex === 'female'
                    ? '/images/user-female-default.png'
                    : '/images/user-male-default.png'
                : 'https://cdn.onlinewebfonts.com/svg/img_242128.png'
            : picture;

    return (
        <figure className="card__image">
            <img src={image} alt={altText} />
        </figure>
    );
};

export default CardImage;
