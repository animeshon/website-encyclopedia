import React from 'react';
import { useState } from 'react';

import Container from '@/components/Container';
import CastCard from '@/components/CastCard';

const CastGrid = ({ container, casts, nationalities }) => {
    const [country, setCountry] = useState('jp');

    const onChange = async (e) => {
        const { value } = e.currentTarget;
        setCountry(value);
    };

    const NotFound = 'There is currently no information about production casts available.';

    return (
        <Container container={container}>
            <main className="anime-cast__description grid">
                <section className="landing-section-box">
                    <header>
                        <h3>Cast</h3>

                        {nationalities && nationalities.length ? (
                            <select default onChange={onChange}>
                                {nationalities.map(notionality => {
                                    const { code, name } = notionality;
                                    return (
                                        <option
                                            key={code}
                                            value={code}
                                            selected={code == country}
                                        >
                                            {name}
                                        </option>
                                    );
                                })}
                            </select>
                        ) : undefined}

                    </header>
                    <div className="grid-halves">
                        {casts && casts.length ? casts.map(cast => {
                            console.log(cast.nationality);
                            if (cast.nationality == country) {
                                return (<CastCard
                                    key={`${cast.person.id}-${cast.character.id}`}
                                    character={cast.character}
                                    person={cast.person}
                                    nationality={cast.nationality} />);
                            }
                        }) : NotFound}
                    </div>
                </section>
            </main>
        </Container>
    );
};

export default CastGrid;