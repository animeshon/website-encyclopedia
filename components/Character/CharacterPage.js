import React, { useState, useEffect } from 'react';

import GetCharacters from '@/queries/GetCharacters';
import GetVoices from '@/queries/GetVoices';

import CharacterGrid from '@/components/Character/CharacterGrid';
import ExpandableSection from '@/components/ExpandableSection';
import Search from '@/components/Search';
import FilterGroup from '@/components/Filter/FilterGroup';
import FilterSelect from '@/components/Filter/FilterSelect';

import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';

import { CharacterDataModelList } from '@/models/character';
import Localization from "@/models/localization";

const CharacterPage = ({ characters, voiceActings, localizations }) => {
    const [language, setLanguage] = useState({value: ""});
    const [filter, setFilter] = useState('');
    
    const characterModels = new CharacterDataModelList(characters);
    characterModels.SetSeyuus(voiceActings);
    characterModels.Localize();
    characterModels.Sort();

    const localizationsModel = localizations.map(l => Localization.FromRawData(l));
    const nationalityOpts = localizationsModel.map(l => {
        return { value: l.GetLanguage().code, label: l.GetLanguage().HumanReadible() }
    })

    const categoryOrder = ["MAIN", "SUPPORT", "APPEARS"];

    const onLanguageChange = async (selectedOption) => {
        setLanguage(selectedOption);
    };

    const onFilterChange = (value) => {
        setFilter(value);
    };

    const NotFound = 'There is currently no information about characters available.';

    useEffect(() => {
        const jp = nationalityOpts.find(n => { return n.value == "jpn" });
        if (jp != undefined) {
            setLanguage(jp);
        } else if (nationalityOpts.length != 0) {
            setLanguage(nationalityOpts[0])
        }
    }, [])

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Characters</h3>
                </header>
                {characterModels.Size() ? <>
                    <FilterGroup>
                        <ul>
                            <li>
                                <p>Search</p>
                                <Search placeholder={"Search by name..."} action={onFilterChange} delay={300} />
                            </li>
                            {nationalityOpts.length != 0 ? <li>
                                <p>Show Seyuu for language</p>
                                <FilterSelect height={30} options={nationalityOpts} value={language} onChange={onLanguageChange} />
                            </li> : undefined}
                        </ul>
                    </FilterGroup>
                    <div className="grid-halves">
                        {filter == '' ? categoryOrder.map(c => {
                            const chars = characterModels.GetByRelation(c);
                            if (chars.length > 0) {
                                const label = chars[0].GetRole();
                                return (
                                    <ExpandableSection key={[c, language?.value]} label={label} >
                                        <CharacterGrid characters={chars} language={language?.value ?? ""} />
                                    </ExpandableSection>
                                )
                            } else {
                                return undefined
                            }
                        }) : (<CharacterGrid characters={characterModels.ContainsString(filter)} language={language?.value ?? ""} />)}
                    </div>
                </> : NotFound}
            </section>
        </main>

    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");

    const queries = [
        PrepareKeyQuery("characters", { id: id }, GetCharacters()),
        PrepareKeyQuery("voices", { id: id }, GetVoices()),
    ];
    const { characters, voices } = await ExecuteQueryBatch(client, queries);

    const voiceActings = voices.voiceActings || [];

    const localizations = voiceActings.map(v => v.localization).filter((localization, index, self) =>
        localization != undefined && index === self.findIndex((t) => (
            t.id === localization.id
        ))
    );

    return {
        characters: characters.starring || [],
        voiceActings,
        localizations,
    };
};

export default CharacterPage;
