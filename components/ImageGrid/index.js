import React from 'react';

const ImageGrid = ({ images, className }) => {
    if (!images || images.length == 0) {
        return 'There is currently no picture available.';
    }
    return (
        <div className={className}>
            {images.map(i => {
                return (
                    <div key={i} className="tile">
                        <img src={i} alt="" />
                    </div>
                );
            })}
        </div>
    );
};

export default ImageGrid;