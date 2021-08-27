import React, {useRef} from 'react';

import SafeImage from '@/components/SafeImage';

const ProfileImage = ({ image, altText, children }) => {
    const thisRef = useRef(null);
    return (
        <div className="container-side">
            <figure className="container-side__image" ref={thisRef}>
                <SafeImage image={image} altText={altText} parent={thisRef} displayButton={true}/>
            </figure>
            {children}
        </div>
    );
};

export default ProfileImage;
