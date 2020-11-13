const ProductCover = ({ bannerImage, altText }) => {
    return (
        <div className="product-cover">
            <figure className="product-cover__image">
                <img src={bannerImage} alt={altText} />
            </figure>
        </div>
    );
};

export default ProductCover;
