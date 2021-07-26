import React from 'react';

import ContentCard from '@/components/Card/Content/ContentCard';

const RelatedGrid = ({ related, max = Number.MAX_SAFE_INTEGER}) => {
    const r = related.Get().slice(0, max).map( r => {
        return {model: r, header: r.GetRelation()}
    })
    return (<>
        {r.map(item => {
            return (<ContentCard key={item.model.GetID()} content={item} />);
        })}
    </>);
};

export default RelatedGrid;