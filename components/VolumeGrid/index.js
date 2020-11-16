import React from 'react';

import VolumeCard from '@/components/VolumeCard';

const VolumeGrid = ({ volumes }) => {
    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Volumes</h3>
                </header>
                <div className="manga-volumes">
                    {volumes && volumes.length ? volumes.map(item => {
                        return (<VolumeCard volume={item} key={item.id} />);
                    }) : 'There is currently no information about volumes available.'}
                </div>
            </section>
        </main>
    );
};

export default VolumeGrid;