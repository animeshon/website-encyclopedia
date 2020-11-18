import React, { useState, useEffect } from 'react';

import Search from '@/components/Search';
import CharacterCard from '@/components/CharacterCard';
import ExpandableSection from '@/components/ExpandableSection';

const MapAndSort = (chars, casts) => {
    const map = {};
    (chars || []).forEach(i => {
        if (map[i.relation] === undefined) {
            map[i.relation] = {
                role: i.role,
                items: [],
            };
        }
        map[i.relation].items.push({
            character: i,
            cast: (casts || []).filter(c => c.characterId == i.id),
        });
    });

    Object.keys(map).map(i => {
        (map[i].items || []).sort((x, y) => { return x.name < y.name ? -1 : x.name > y.name; });
    });

    return map;
}

const CanDisplay = (item, filter, country) => {
    if (filter === '') {
        return true;
    }
    if (item.cast.filter(c => c.nationality == country && c.person.name.toLowerCase().includes(filter)).length != 0) {
        return true;
    }
    if (item.character.name.toLowerCase().includes(filter)) {
        return true;
    }
    return false;
}


const FilteredCahracters = (map, filter, country) => {
    if (filter === '') {
        return map;
    }

    let newCharacter = {};
    Object.keys(map).map(i => {
        newCharacter[i] = {
            role: map[i].role,
            items: map[i].items.filter(c => CanDisplay(c, filter, country)),
        };
    });
    return newCharacter;
}

const CharacterGrid = ({ characters, cast, nationalities }) => {
    const charactersMap = MapAndSort(characters, cast);

    const [open, setOpen] = useState({ "MAIN": true });
    const [charactersState, setSetCharacters] = useState(charactersMap);

    const openSection = (e, val) => {
        setOpen({
            ...open,
            [e.currentTarget.name]: !val,
        });
    };

    const categoryOrder = ["MAIN", "SUPPORT", "APPEARS"];

    const [country, setCountry] = useState('jp');
    const [filter, setFilter] = useState('');

    const onCountryChange = async (e) => {
        const { value } = e.currentTarget;
        setCountry(value);
        setSetCharacters(FilteredCahracters(charactersMap, filter, value));
    };

    const onFilterChange = (value) => {
        setSetCharacters(FilteredCahracters(charactersMap, value, country));
        setFilter(value);
    };

    const NotFound = 'There is currently no information about characters available.';

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header className="header-with-double-filter">
                    <h3>Characters</h3>
                    <div className="filter-container">
                        <Search placeholder={"Search..."} action={onFilterChange}></Search>

                        {nationalities && nationalities.length ? (
                            <select className="custom-select" default onChange={onCountryChange}>
                                {nationalities.map(notionality => {
                                    const { code, name } = notionality;
                                    if (code) {
                                        return (
                                            <option
                                                key={code}
                                                value={code}
                                                selected={code == country}
                                            >
                                                {name}
                                            </option>
                                        )
                                    };
                                })}
                            </select>
                        ) : undefined}

                    </div>
                </header>
                <div className="grid-halves">
                    {charactersState && Object.keys(charactersState).length ? categoryOrder.map(c => {
                        const category = charactersState[c] ? charactersState[c] : undefined;

                        if (filter == '') {
                            if (category && category.items.length) {
                                return (<ExpandableSection key={c} label={category.role} identifier={c} open={open} action={openSection}>
                                    {category.items.map(item => {
                                        return (<CharacterCard
                                            key={item.character.id}
                                            character={item.character}
                                            cast={item.cast}
                                            country={country} />
                                        );
                                    })}
                                </ExpandableSection>)
                            }
                        } else {
                            return (
                                <>{charactersState[c]?.items?.map(item => {
                                    return (<CharacterCard
                                        key={item.character.id}
                                        character={item.character}
                                        cast={item.cast}
                                        country={country} />
                                    );
                                })}</>
                            )
                        }
                    }) : NotFound}
                </div>
            </section>
        </main>
    );
};

export default CharacterGrid;