import { useMediaQuery } from 'react-responsive';
import { useEffect } from 'react';

import EntityTitle from '@/components//EntityTitle';
import SafeImage from '@/components/SafeImage';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 });
    return isNotMobile ? children : null;
};

const BannerImage = ({ title, breadcrumb = [], image, altText }) => {
    return (
        <div className="hero-cover">
            <div className="hero-cover__image">
                {image ? <SafeImage image={image} altText={altText} /> : 
                 <img src={`${ASSET_PREFIX}/images/random-banner-${title.length % 4}.jpg`} alt={altText} />}
            </div>
            <div className="hero-cover__shade" />
            <Default>
                <div className="hero-cover__title">
                    <EntityTitle key={title} title={title} breadcrumb={breadcrumb} />
                </div>
            </Default>
        </div>
    );
};

export default BannerImage;
