import EntityTitle from '../EntityTitle';
import { useMediaQuery } from 'react-responsive';

const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 });
    return isNotMobile ? children : null;
};

const HeroCover = ({ title, breadcrumb = [], bannerImage, altText }) => {
    return (
        <div className="hero-cover">
            {bannerImage && (
                <>
                    <img
                        className="hero-cover__image"
                        src={bannerImage}
                        alt={altText}
                    />
                    <div className="hero-cover__shade" />
                </>
            )}
            <Default>
                <div className="hero-cover__title">
                    <EntityTitle title={title} breadcrumb={breadcrumb} />
                </div>
            </Default>
        </div>
    );
};

export default HeroCover;
