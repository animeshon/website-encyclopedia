import React, { useState, useEffect } from 'react';

import ExpandableSection from '@/components/ExpandableSection';
import ContentCard from '@/components/Card/Content/ContentCard';

const MapAndSort = (array) => {
    const map = {};
    (array || []).forEach(i => {
        if (map[i.type] === undefined) {
            map[i.type] = {
                type: i.media,
                items: [],
            };
        }
        map[i.type].items.push(i);
    });

    Object.keys(map).map(i => {
        (map[i].items || []).sort((x, y) => { return x.name < y.name ? -1 : x.name > y.name; });
    });

    return map;
}


const CanonizableContent = ({ contents, title }) => {
    const map = MapAndSort(contents);
    const k = Object.keys(map);

    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>{title}</h3>
                </header>
            </section>
            { map && k.length ? k.map(i => {
                return (<ExpandableSection key={i} label={map[i].type}>
                    {map[i].items.map(item => {
                        return (<ContentCard key={item.id} content={item} />)
                    })}
                </ExpandableSection>);
            })
                : 'No information found.'}
        </main>
    );
};

export default CanonizableContent;