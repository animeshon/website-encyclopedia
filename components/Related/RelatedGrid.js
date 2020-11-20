import React from 'react';

import RelatedCard from '@/components/Related/RelatedCard';

const RelatedGrid = ({ related }) => {
    return (<>
        {related?.map(item => {
            return (<RelatedCard key={item.id} content={item} />);
        })}
    </>);
};

export default RelatedGrid;