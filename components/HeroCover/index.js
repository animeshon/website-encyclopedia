import EntityTitle from '../EntityTitle';
import { useMediaQuery } from 'react-responsive';

const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 769 });
    return isNotMobile ? children : null;
};

const HeroCover = ({ entityTitle, heroImage, altText = 'hero cover pic' }) => {
    if (heroImage) {
        return (
            <div className="hero-cover">
                <img
                    className="hero-cover__image"
                    src={heroImage}
                    alt={altText}
                />
                <div className="hero-cover__shade" />
                <Default>
                    <div className="hero-cover__title">
                        <EntityTitle title={entityTitle} />
                    </div>
                </Default>
            </div>
        );
    }
    return null;
};

export default HeroCover;
