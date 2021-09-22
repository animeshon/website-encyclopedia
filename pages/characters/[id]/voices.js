import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import GetVoiceActors from '@/queries/GetVoiceActors';

import { VoiceActingModelList, SortBy } from '@/models/voice-acting'

import VoicedCard from '@/components/Voiced/VoicedCard';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const VoiceActors = ({ voiceActors }) => {
    const voiceActorsModels = VoiceActingModelList.FromRawData(voiceActors, "actor");
    voiceActorsModels.Localize();
    voiceActorsModels.Sort(SortBy.LOCALIZATION);

    return (
        <main className="landing__description landing__100">
            <section className="landing-section-box">
                <header>
                    <h3>Voice Actors</h3>
                </header>
            </section>
            <div className="grid-halves">
                {voiceActorsModels.Size() ? voiceActorsModels.map(v => {
                    return (<VoicedCard key={v.GetID()} subject={v} />)
                }) : 'There is currently no appearances information available.'}
            </div>
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");

    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, GetVoiceActors()));

    return {
        voiceActors: data.voices || [],
    };
};

export default withContainer(VoiceActors);
export const getServerSideProps = withContainerProps(getProps);
