const ProductCover = ({ coverImage, altText }) => {
    return (
        <div className="product-cover">
            <figure className="product-cover__image">
                <img src={coverImage} alt={altText} />
            </figure>
        </div>
    );
};

export default ProductCover;
