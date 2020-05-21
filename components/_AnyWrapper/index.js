import { useMediaQuery } from 'react-responsive';

import HeroCover from '../HeroCover';
import ProductCover from '../ProductCover';
import TabNavigation from '../TabNavigation';
import EntityTitle from '../EntityTitle';

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

const AnyWrapper = ({
    children,
    anyId,
    coverImage,
    heroImage,
    coverImageAltText,
    heroImageAltText,
    selectedMenu,
    anyNav,
    anyTitle,
}) => {
    return (
        <div className="any">
            <HeroCover
                entityTitle={anyTitle}
                altText={heroImageAltText}
                heroImage={heroImage}
            />
            <TabNavigation items={anyNav(anyId)} selected={selectedMenu} />
            <div className="any-landing container">
                <div className="any-landing__cover">
                    <ProductCover
                        altText={coverImageAltText}
                        coverImage={coverImage}
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
