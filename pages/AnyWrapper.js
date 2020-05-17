import HeroCover from '../components/HeroCover';
import ProductCover from '../components/ProductCover';
import TabNavigation from '../components/TabNavigation';
import EntityTitle from '../components/EntityTitle';
import { useMediaQuery } from 'react-responsive';

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
}) => {
    return (
        <div className="any">
            <HeroCover altText={heroImageAltText} heroImage={heroImage} />
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
                        <EntityTitle title="Fate/Kaleid Liner Prisma Illya" />
                    </Mobile>
                    {children}
                </div>
                <style jsx>{`
                    @media screen and (max-width: 1024px) {
                        .grid {
                            flex-direction: column;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default AnyWrapper;
