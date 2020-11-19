import React from 'react';

import SafeImage from '@/components/SafeImage';

const ImageGrid = ({ images, className }) => {
    if (!images || images.length == 0) {
        return 'There is currently no picture available.';
    }
    return (
        <div className={className}>
            {images.map(i => {
                return (
                    <div key={i} className="tile">
                        <SafeImage image={i} displayButton={true} />
                    </div>
                );
            })}
        </div>
    );
};

export default ImageGrid;