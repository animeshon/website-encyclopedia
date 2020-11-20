import React from 'react';

import RelatedGrid from '@/components/Related/RelatedGrid';
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

const RelatedCategory = ({ related, highlighted }) => {
    const mapRelated = MapAndSort(related);
    const k = Object.keys(mapRelated);
    const keys = highlighted.concat(k.filter(e => !highlighted.includes(e)));

    return (<>
        {keys.map(i => {
            return mapRelated[i] ? (<ExpandableSection key={i} label={mapRelated[i].type}>
                <RelatedGrid related={mapRelated[i].items} />
            </ExpandableSection>) : undefined;
        })}
    </>);
};

export default RelatedCategory;