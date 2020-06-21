import HeroCover from '@/components/HeroCover';
import ProductCover from '@/components/ProductCover';
import TabNavigation from '@/components/TabNavigation';
import EntityTitle from '@/components/EntityTitle';
import { useMediaQuery } from 'react-responsive';

// components
import Header from '@/components/Header';

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
            <Header isSearchAvailable />
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
