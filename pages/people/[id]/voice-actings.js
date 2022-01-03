import React, { useState, useEffect } from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import GetVoiceActings from '@/queries/GetVoiceActings';

import FilterGroup from '@/components/Filter/FilterGroup';
import Search from '@/components/Search';
import VoicedCard from '@/components/Voiced/VoicedCard';

import { VoiceActingModelList, SortBy } from '@/models/voice-acting'

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';


const VoiceActings = ({ voiceActings }) => {
    const [filter, setFilter] = useState('');
    const [shown, setShown] = useState();

    const voiceActorsModels = VoiceActingModelList.FromRawData(voiceActings, "voiced");
    voiceActorsModels.Localize();
    voiceActorsModels.Sort(SortBy.NAME);

    useEffect(() => {
        const s = voiceActorsModels.ContainsString(filter ?? "");
        setShown(s);
    }, [filter])

    return (
        <main className="landing__description landing__100">
            <section className="landing-section-box">
                <header>
                    <h3>Voice Actings</h3>
                </header>
            </section>
            <FilterGroup>
                <ul>
                    <li>
                        <p>Search</p>
                        <Search placeholder={"Search by name..."} action={setFilter} delay={300} />
                    </li>
                </ul>
            </FilterGroup>
            <div className="grid-halves">
                {shown && shown.Size() ? shown.map(v => {
                    return (<VoicedCard key={v.GetResourceName()} subject={v} />)
                }) : 'There is currently no voice acting information available.'}
            </div>
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, GetVoiceActings()));

    return {
        voiceActings: data.voiceActings || [],
    };
};

export default withContainer(VoiceActings);
export const getServerSideProps = withContainerProps(getProps);