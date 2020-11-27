import React, { useState, useEffect } from 'react';

import GetCharacters from '@/queries/GetCharacters';
import GetCast from '@/queries/GetCast';

import CharacterGrid from '@/components/Character/CharacterGrid';
import CharacterCard from '@/components/Character/CharacterCard';
import ExpandableSection from '@/components/ExpandableSection';
import Search from '@/components/Search';
import Flag from '@/components/Flag';

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
    if (item.cast.filter(c => c.nationality == country && c.person.name.toLowerCase().includes(filter)).length != 0) {
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
            item.cast ? item.cast = item.cast.filter(c => c.nationality == country) : undefined;
        }) : undefined;
    });
    return newCharacter;
}

const CharacterPage = ({ characters, cast, nationalities }) => {
    const [country, setCountry] = useState('jp');
    const [filter, setFilter] = useState('');

    const charactersMap = MapAndSort(characters, cast);

    const categoryOrder = ["MAIN", "SUPPORT", "APPEARS"];

    const [charactersState, setSetCharacters] = useState(FilteredCahracters(charactersMap, filter, country));

    const onCountryChange = async (e) => {
        const { value } = e.currentTarget;
        setCountry(value);
    };

    const onFilterChange = (value) => {
        setFilter(value);
    };

    useEffect(() => {
        setSetCharacters(FilteredCahracters(charactersMap, filter, country));
    }, [country, filter]);

    const NotFound = 'There is currently no information about characters available.';

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header className="header-with-double-filter">
                    <h3>Characters</h3>
                    <div className="filter-container">
                        <Search placeholder={"Search..."} action={onFilterChange} delay={300}></Search>

                        {nationalities && nationalities.length ? (
                            <select className="custom-select" value={country} onChange={onCountryChange}>
                                {nationalities.map(notionality => {
                                    const { code, name } = notionality;
                                    if (code) {
                                        return (
                                            <option key={code} value={code}>
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

CharacterPage.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const type = uri.GuessType(ctx);

    const queries = [
        PrepareKeyQuery("data", { id: id }, GetCharacters(type)),
        PrepareKeyQuery("cast", { id: id }, GetCast(type)),
    ];
    const { data, cast } = await ExecuteQueryBatch(ctx, queries);

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
