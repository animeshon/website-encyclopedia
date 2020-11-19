import React, { useState, useEffect } from 'react';

import RelatedCard from '@/components/RelatedCard';
import ExpandableSection from '@/components/ExpandableSection';

import { Type } from '@/utilities/MediaType';

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

    let state = {};
    keys.forEach(o => state[o] = true);
    const [open, setOpen] = useState(state);

    const openSection = (e, val) => {
        setOpen({
            ...open,
            [e.currentTarget.name]: !val,
        });
    };

    return (<>
        {keys.map(i => {
            return mapRelated[i] ? (<ExpandableSection key={i} label={mapRelated[i].type} identifier={i} open={open} action={openSection}>
                {mapRelated[i].items.map(item => {
                    return (<RelatedCard key={item.id} content={item} />);
                })}
            </ExpandableSection>) : undefined;
        })}
    </>);
};

export default RelatedGrid;