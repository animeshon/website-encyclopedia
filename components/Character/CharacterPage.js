import React, { useState, useEffect } from 'react';

import GetCharacters from '@/queries/GetCharacters';
import GetCast from '@/queries/GetCast';

import CharacterGrid from '@/components/Character/CharacterGrid';
import ExpandableSection from '@/components/ExpandableSection';
import Search from '@/components/Search';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';

import { Role } from '@/utilities/CharacterRole';
import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import { FromAlpha2 } from '@/utilities/Nationality';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';

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
    if (item.character.name.toLowerCase().includes(filter)) {
        return true;
    }
    return false;
}

const FilteredCahracters = (map, filter, country) => {
    let newCharacter = {};
    Object.keys(map).map(i => {
        if (filter === '') {
            newCharacter = map;
        } else {
            // filter cards, checking if the whole card match the filter
            newCharacter[i] = {
                role: map[i].role,
                items: map[i].items.filter(c => CanDisplay(c, filter, country)),
            };
        }
        // filter che voice actors according to the country
        newCharacter[i].items ? newCharacter[i].items.map(item => {
            item.cast ? item.cast = item.cast.filter(c => c.nationality == country.value) : undefined;
        }) : undefined;
    });
    return newCharacter;
}

const CharacterPage = ({ characters, cast, nationalities }) => {
    const [country, setCountry] = useState({});
    const [filter, setFilter] = useState('');

    const charactersMap = MapAndSort(characters, cast);

    const categoryOrder = ["MAIN", "SUPPORT", "APPEARS"];

    const [charactersState, setSetCharacters] = useState(FilteredCahracters(charactersMap, filter, country));

    const onCountryChange = async (selectedOption) => {
        setCountry(selectedOption);
    };

    const onFilterChange = (value) => {
        setFilter(value);
    };

    useEffect(() => {
        setSetCharacters(FilteredCahracters(charactersMap, filter, country));
    }, [country, filter]);

    const NotFound = 'There is currently no information about characters available.';

    const nationalityOpts = nationalities.map(n => {
        return { value: n.code, label: n.name }
    })
    
    useEffect(() => {
        const jp = nationalityOpts.filter(n => { return n.value == "jp" });
        if (jp.length != 0) {
            setCountry(jp[0]);
        } else if (nationalityOpts.length != 0) {
            setCountry(nationalityOpts[0])
        }

    }, [nationalities])

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header className="header-with-double-filter">
                    <h3>Characters</h3>
                </header>
                <FilterGroup>
                    <ul>
                        <li>
                            <Search placeholder={"Search by name..."} action={onFilterChange} delay={300} />
                        </li>
                        {nationalityOpts.length != 0 ? <li>
                            <FilterSelect height={30} options={nationalityOpts} value={country} onChange={onCountryChange}/>
                        </li> : undefined}
                    </ul>
                </FilterGroup>
                <div className="grid-halves">
                    {charactersState && Object.keys(charactersState).length ? categoryOrder.map(c => {
                        const chars = charactersState[c] ? charactersState[c] : undefined;
                        if (filter == '') {
                            if (chars?.items?.length > 0) {
                                return (
                                    <ExpandableSection key={c} label={chars.role} >
                                        <CharacterGrid characters={chars.items} />
                                    </ExpandableSection>
                                )
                            }
                        } else {
                            return (<CharacterGrid characters={chars?.items} />)
                        }
                    }) : NotFound}
                </div>
            </section>
        </main>

    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("data", { id: id }, GetCharacters(type)),
        PrepareKeyQuery("cast", { id: id }, GetCast(type)),
    ];
    const { data, cast } = await ExecuteQueryBatch(client, queries);

    const characters = (data?.starring || []).map(i => {
        const { id, images, names, __typename } = i.character;
        return {
            id,
            type: __typename,
            name: locale.LatinAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images),
            role: Role(i.relation),
            relation: i.relation,
        }
    });

    const nationalities = [];
    const casts = (cast?.voiceActings || []).map(member => {
        const { isPrimary, actor, voiced, localization } = member;

        // TODO: Vastly improve the logic here.
        // Try to fetch country alpha-2, fallback to language alpha-2.
        var nationality = undefined;
        if (localization?.country?.alpha2) {
            nationality = localization.country.alpha2;
        } else if (localization?.language?.alpha2) {
            nationality = localization.language.alpha2;
        }

        nationality = nationality?.toLowerCase();
        nationality ? nationalities.push(nationality) : null;

        return {
            nationality: FromAlpha2([nationality])[0]?.code,
            characterId: voiced.id,
            primary: isPrimary,
            person: {
                id: actor.id,
                name: locale.LatinAny(actor.names),
                image: image.ProfileAny(actor.images),
                gender: actor.gender,
            }
        };
    });

    return {
        characters,
        cast: casts,
        nationalities: FromAlpha2(nationalities)
    };
};

export default CharacterPage;
