import Router from 'next/router';

import Button from '@/components/Button';

import { SetSafeSearch } from '@/utilities/SafeSearch';

const ProfileImage = ({ profileImage, altText }) => {
    const onClick = e => {
        SetSafeSearch(false);
        Router.reload();
    };

    return (
        <div className="product-cover">
            <figure className="product-cover__image">
                <img src={profileImage ? profileImage : '/images/default-profile-picture.jpg'} alt={altText} />
            </figure>
            {isCensored ? <Button className="cherry-red big" type="form-submit" onClick={onClick}>SHOW</Button> : undefined}
        </div>
    );
};

export default ProfileImage;
