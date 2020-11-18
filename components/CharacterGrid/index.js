import React, { useState, useEffect } from 'react';

import CharacterCard, { CharacterRole } from '@/components/CharacterCard';
import ExpandableSection from '@/components/ExpandableSection';

const CharacterGrid = ({ characters }) => {
    const [open, setOpen] = useState({ "MAIN": true });
    const openSection = (e, val) => {
        setOpen({
            ...open,
            [e.currentTarget.name]: !val,
        });
    };

    // Sort
    // TODO beautify or do it at query time
    const categoryOrder = ["MAIN", "SUPPORT", "APPEARS"];
    (characters["MAIN"] || []).sort((x, y) => {return x.name < y.name ? -1 : x.name > y.name;});
    (characters["SUPPORT"] || []).sort((x, y) => {return x.name < y.name ? -1 : x.name > y.name;});
    (characters["APPEARS"] || []).sort((x, y) => {return x.name < y.name ? -1 : x.name > y.name;});

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Characters</h3>
                </header>
                <div className="grid-halves">
                    {characters ? categoryOrder.map(category => {
                        const label = CharacterRole(category)
                        if (label && characters[category] && characters[category].length) {
                            return (<ExpandableSection label={label} key={label} identifier={category} open={open} action={openSection}>
                                {characters[category].map(item => {
                                    return (<CharacterCard character={item} key={item.id} />);
                                })}
                            </ExpandableSection>)
                        }
                    }) : 'There is currently no information about characters available.'}
                </div>
            </section>
        </main>
    );
};

export default CharacterGrid;