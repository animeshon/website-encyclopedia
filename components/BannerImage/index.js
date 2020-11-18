import EntityTitle from '../EntityTitle';
import { useMediaQuery } from 'react-responsive';

const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 });
    return isNotMobile ? children : null;
};

const BannerImage = ({ title, breadcrumb = [], bannerImage, altText }) => {
    return (
        <div className="hero-cover">
            <img
                className="hero-cover__image"
                src={bannerImage ? bannerImage : `/images/random-banner-${title.length % 4}.jpg`}
                alt={altText}
            />
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
