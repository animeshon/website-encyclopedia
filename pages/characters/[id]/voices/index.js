import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import getVoiceActors from '@/queries/character/VoiceActors';

import VoicedCard from '@/components/Voiced/VoicedCard';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';


const MapVoiceActors = (voiceActors) => {
    let mapVoiceActors = {};
    voiceActors.forEach(v => {
        if (!mapVoiceActors.hasOwnProperty(v.actor.id)) {
            mapVoiceActors[v.actor.id] = {
                id: v.actor.id,
                type: v.actor.type,
                name: v.actor.name,
                japaneseName: v.actor.japaneseName,
                nationality: v.nationality,
                gender: v.actor.gender,
                image: v.actor.image,
                productions: [],
            };
        }
        mapVoiceActors[v.actor.id].productions.push({
            id: v.content.id,
            type: v.content.type,
            name: v.content.name,
            japaneseName: v.content.japaneseName,
            isPrimary: v.isPrimary,
        });
    });

    return mapVoiceActors;
}

const VoiceActors = ({ voiceActors }) => {
    const mapVoiceActors = MapVoiceActors(voiceActors);
    const keys = Object.keys(mapVoiceActors).sort((x, y) => {
        return mapVoiceActors[x].nationality > mapVoiceActors[y].nationality ?
            -1 : mapVoiceActors[x].nationality < mapVoiceActors[y].nationality;
    });

    return (
        <main className="landing__description landing__100">
            <section className="landing-section-box">
                <header>
                    <h3>Voice Actors</h3>
                </header>
            </section>
            <div className="grid-halves">
                {keys && keys.length ? keys.map(k => {
                    return (<VoicedCard key={k} subject={mapVoiceActors[k]} />)
                }) : 'There is currently no appearances information available.'}
            </div>
        </main>
    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, getVoiceActors()));

    const voiceActors = (data.voices || []).map(i => {
        const { isPrimary, localization, actor, content } = i;

        // TODO: Vastly improve the logic here.
        // Try to fetch country alpha-2, fallback to language alpha-2.
        var nationality = undefined;
        if (localization?.country?.alpha2) {
            nationality = localization.country.alpha2;
        }
        if (nationality === undefined && localization?.language?.alpha2) {
            nationality = localization.language.alpha2;
        }

        return {
            isPrimary: isPrimary,
            nationality: nationality?.toLowerCase(),
            actor: {
                id: actor.id,
                type: actor.__typename,
                image: image.ProfileAny(actor.images),
                name: locale.LatinAny(actor.names),
                japaneseName: locale.Japanese(actor.names),
                gender: actor.gender,
            },
            content: {
                id: content.id,
                type: content.__typename,
                name: locale.EnglishAny(content.names),
                japaneseName: locale.Japanese(content.names),
            }
        };
    });

    return {
        voiceActors: voiceActors,
    };
};

export default withContainer(VoiceActors);
export const getServerSideProps = withContainerProps(getProps);
