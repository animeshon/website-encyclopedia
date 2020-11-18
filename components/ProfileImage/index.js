import Router from 'next/router';
import cookies from 'cookie-cutter';

import Button from '@/components/Button';

const ProfileImage = ({ profileImage, altText, isSafeSearch = true, isAdultOnly = false }) => {
    var isMissing = false;
    if (!profileImage) {
        profileImage = '/images/default-profile-picture.jpg';
        isMissing = true;
    }

    var isCensored = false;
    if (!isMissing && isAdultOnly && isSafeSearch) {
        profileImage = '/images/adult-only-warning.jpg';
        isCensored = true;
    }

    const onClick = e => {
        cookies.set('images.adult.enabled', 'true');
        Router.reload();
    };

    return (
        <div className="product-cover">
            <figure className="product-cover__image">
                <img src={profileImage} alt={altText} />
            </figure>
            {isCensored ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
        </div>
    );
};

export default ProfileImage;
