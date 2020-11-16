import React from 'react';

import Container from '@/components/Container';
import CharacterCard from '@/components/CharacterCard';

const CharacterGrid = ({ container, characters }) => {
    return (
        <Container container={container}>
            <main className="anime-characters__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Characters</h3>
                    </header>
                    <div className="grid-halves">
                        {characters && characters.length ? characters.map(item => {
                            return (<CharacterCard item={item} key={item.id} />);
                        }) : 'There are currently no information about characters available.'}
                    </div>
                </section>
            </main>
        </Container>
    );
};

export default CharacterGrid;