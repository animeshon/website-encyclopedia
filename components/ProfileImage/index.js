const ProfileImage = ({ profileImage, altText }) => {
    return (
        <div className="product-cover">
            <figure className="product-cover__image">
                <img src={profileImage} alt={altText} />
            </figure>
        </div>
    );
};

export default ProfileImage;
