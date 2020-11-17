import React from 'react';
import { useState } from 'react';

import CastCard from '@/components/CastCard';
import Search from '@/components/Search';

const CastGrid = ({ casts, nationalities }) => {
    const [country, setCountry] = useState('jp');
    const [filter, setFilter] = useState('');

    const onChange = async (e) => {
        const { value } = e.currentTarget;
        setCountry(value);
    };

    const NotFound = 'There is currently no information about production casts available.';

    return (
        <main className="anime-cast__description grid">
            <section className="landing-section-box">
                <header className="header-with-double-filter">
                    <h3>Cast</h3>
                    <div className="filter-container">
                    <Search placeholder={"Search..."} action={setFilter}></Search>

                    {nationalities && nationalities.length ? (
                        <select className="custom-select" default onChange={onChange}>
                            {nationalities.map(notionality => {
                                const { code, name } = notionality;
                                if (code) { return (
                                    <option
                                        key={code}
                                        value={code}
                                        selected={code == country}
                                    >
                                        {name}
                                    </option>
                                )};
                            })}
                        </select>
                    ) : undefined}

                    </div>
                </header>
                <div className="grid-halves">
                    {casts && casts.length ? casts.map(cast => {
                        if (CanDisplay(cast, country, filter)) {
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
    );
};

const CanDisplay = (cast, country, filter) => {
    if (cast.nationality != country) {
        return false;
    }
    if (filter === '') {
        return true;
    }
    if (cast.person.name.toLowerCase().includes(filter)) {
        return true;
    }
    if (cast.person.japaneseName && cast.person.japaneseName.toLowerCase().includes(filter)) {
        return true;
    }
    return false;
}

export default CastGrid;