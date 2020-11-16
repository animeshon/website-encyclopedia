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

    const categoryOrder = ["MAIN", "SUPPORT", "APPEARS"]

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
                            return (<ExpandableSection label={label} identifier={category} open={open} action={openSection}>
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