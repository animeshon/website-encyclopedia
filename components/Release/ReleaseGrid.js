import React from 'react';

import ReleaseCard from '@/components/Release/ReleaseCard';

const ReleaseGrid = ({ releases }) => {
    return (
        <section>
            <div className="release-list">
                {releases && releases.Size() ? releases.map(item => {
                    return (<ReleaseCard key={item.GetResourceName()} release={item} />);
                }) : 'There is currently no information about releases available.'}
            </div>
        </section>
    );
};

export default ReleaseGrid;