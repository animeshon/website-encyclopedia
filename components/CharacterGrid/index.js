import React from 'react';

import CharacterCard from '@/components/CharacterCard';

const CharacterGrid = ({ characters }) => {
    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Characters</h3>
                </header>
                <div className="grid-halves">
                    {characters && characters.length ? characters.map(item => {
                        return (<CharacterCard character={item} key={item.id} />);
                    }) : 'There is currently no information about characters available.'}
                </div>
            </section>
        </main>
    );
};

export default CharacterGrid;