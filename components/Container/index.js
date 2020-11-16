import { useMediaQuery } from 'react-responsive';

import HeroCover from '@/components/HeroCover';
import ProductCover from '@/components/ProductCover';
import TabNavigation from '@/components/TabNavigation';
import EntityTitle from '@/components/EntityTitle';
import Header from '@/components/Header';

const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    return isMobile ? children : null;
};

const Container = ({ container, children }) => {
    return (
        <div className="any">
            <Header isSearchAvailable />
            <HeroCover
                entityTitle={container.title}
                altText={container.title}
                profileImage={container.profileImage}
            />
            <TabNavigation items={container.navigation} selected={container.selected} />
            <div className="any-landing container">
                <div className="any-landing__cover">
                    <ProductCover
                        altText={container.title}
                        bannerImage={container.bannerImage}
                    />
                </div>
                <div className="product-page-offset grid">
                    <Mobile>
                        <EntityTitle title={container.title} />
                    </Mobile>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Container;
