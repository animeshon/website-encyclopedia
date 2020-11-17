import React from 'react';

const ImageGrid = ({ images, className }) => {
    return (
        <div className={className}>
            {images && images.length ? images.map(i => {
                return (
                    <div key={i} className="tile">
                        <img src={i} alt="" />
                    </div>
                );
            }): 'There is currently no picture available.'}
        </div>
    );
};

export default ImageGrid;