import React from 'react';

import ContentCard from '@/components/Card/Content/ContentCard';

const RelatedGrid = ({ related }) => {
    const r = related.map( r => {
        return {...r, header: r.relation}
    })
    return (<>
        {r.map(item => {
            return (<ContentCard key={item.id} content={item} />);
        })}
    </>);
};

export default RelatedGrid;