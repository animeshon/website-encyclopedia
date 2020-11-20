import React from 'react';

import RelatedCard from '@/components/RelatedCard';
import ExpandableSection from '@/components/ExpandableSection';

const MapAndSort = (array) => {
    const mapRelated = {};
    (array || []).forEach(i => {
        if (mapRelated[i.relationType] === undefined) {
            mapRelated[i.relationType] = {
                type: i.relation,
                items: [],
            };
        }
        mapRelated[i.relationType].items.push(i);
    });

    Object.keys(mapRelated).map(i => {
        (mapRelated[i].items || []).sort((x, y) => { return x.name < y.name ? -1 : x.name > y.name; });
    });

    return mapRelated;
}

const RelatedGrid = ({ related, highlighted }) => {
    const mapRelated = MapAndSort(related);
    const k = Object.keys(mapRelated);
    const keys = highlighted.concat(k.filter(e => !highlighted.includes(e)));

    return (<>
        {keys.map(i => {
            return mapRelated[i] ? (<ExpandableSection key={i} label={mapRelated[i].type}>
                {mapRelated[i].items.map(item => {
                    return (<RelatedCard key={item.id} content={item} />);
                })}
            </ExpandableSection>) : undefined;
        })}
    </>);
};

export default RelatedGrid;