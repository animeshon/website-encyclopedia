import React, { useState } from 'react';

import AppearanceCard from '@/components/AppearanceCard';
import ExpandableSection from '@/components/ExpandableSection';

import { Type } from '@/utilities/MediaType';

export const PruneInvalidAppearances = (appearances) => {
    return appearances.filter(a => ["Anime", "LightNovel", "VisualNovel", "Manga", "Doujinshi"].includes(a.type));
}

const MapAndSort = (array) => {
    const mapAppearances = {};
    (PruneInvalidAppearances(array) || []).forEach(i => {
        if (mapAppearances[i.type] === undefined) {
            mapAppearances[i.type] = [];
        }
        mapAppearances[i.type].push(i);
    });

    Object.keys(mapAppearances).map(i => {
        (mapAppearances[i] || []).sort((x, y) => { return x.name < y.name ? -1 : x.name > y.name; });
    });

    return mapAppearances;
}

const AppearanceGrid = ({ appearances }) => {

    const mapAppearances = MapAndSort(appearances);
    const keys = Object.keys(mapAppearances);

    return (<div>
        {keys.map(i => {
            return (<ExpandableSection key={i} label={Type(i)}>
                {mapAppearances[i].map(item => {
                    return (<AppearanceCard key={item.id} content={item} />);
                })}
            </ExpandableSection>)
        })
        }
    </div>);
};

export default AppearanceGrid;