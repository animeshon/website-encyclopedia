import { useReducer } from 'react';
import { useMediaQuery } from 'react-responsive';

import HeroCover from '@/components/HeroCover';
import ProductCover from '@/components/ProductCover';
import TabNavigation from '@/components/TabNavigation';
import EntityTitle from '@/components/EntityTitle';

// components
import Header from '@/components/Header';

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

const AnyWrapper = ({
    children,
    anyId,
    bannerImage,
    profileImage,
    bannerImageAltText,
    profileImageAltText,
    selectedMenu,
    anyNav,
    anyTitle,
}) => {
    return (
        <div className="any">
            <Header isSearchAvailable />
            <HeroCover
                entityTitle={anyTitle}
                altText={profileImageAltText}
                profileImage={profileImage}
            />
            <TabNavigation items={anyNav(anyId)} selected={selectedMenu} />
            <div className="any-landing container">
                <div className="any-landing__cover">
                    <ProductCover
                        altText={bannerImageAltText}
                        bannerImage={bannerImage}
                    />
                </div>
                <div className="product-page-offset grid">
                    <Mobile>
                        <EntityTitle title={anyTitle} />
                    </Mobile>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AnyWrapper;
