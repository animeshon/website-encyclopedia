import React from 'react';

import ReleaseCard from '@/components/Release/ReleaseCard';

const ReleaseGrid = ({ releases }) => {
    return (
        <section className="landing-section-box">
            <header>
                <h3>Episodes</h3>
            </header>
            <div className="release-list">
                {releases && releases.length ? releases.map(item => {
                    return (<ReleaseCard release={item} key={item.id} />);
                }) : 'There is currently no information about releases available.'}
            </div>
        </section>
    );
};

export default ReleaseGrid;