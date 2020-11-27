import React from 'react';

import withContainer from '@/components/Container';
import getVoiceActings from '@/queries/person/VoiceActings';

import VoicedCard from '@/components/Voiced/VoicedCard';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';


const MapVoiceActings = (voiceActings) => {
    let mapVoiceActings = {};
    voiceActings.forEach(v => {
        if (!mapVoiceActings.hasOwnProperty(v.voiced.id)) {
            mapVoiceActings[v.voiced.id] = {
                id: v.voiced.id,
                type: v.voiced.type,
                name: v.voiced.name,
                japaneseName: v.voiced.japaneseName,
                nationality: v.nationality,
                image: v.voiced.image,
                productions: [],
            };
        }
        mapVoiceActings[v.voiced.id].productions.push({
            id: v.content.id,
            type: v.content.type,
            name: v.content.name,
            japaneseName: v.content.japaneseName,
            isPrimary: v.isPrimary,
        });
    });
    return mapVoiceActings;
}

const VoiceActings = ({ voiceActings }) => {
    const mapVoiceActings = MapVoiceActings(voiceActings);
    const keys = Object.keys(mapVoiceActings).sort((x, y) => { return mapVoiceActings[x].name < mapVoiceActings[y].name ? 
        -1 : mapVoiceActings[x].name > mapVoiceActings[y].name; });

    return (
        <main className="landing__description landing__100">
            <section className="landing-section-box">
                <header>
                    <h3>Voice Actings</h3>
                </header>
            </section>
            <div className="grid-halves">
             { keys && keys.length ? keys.map(k => {
                 return (<VoicedCard key={k} subject={mapVoiceActings[k]}/>)
             }): 'There is currently no voice acting information available.'}
            </div>
        </main>
    );
};

VoiceActings.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getVoiceActings()));

    const voiceActings = (data.voiceActings || []).map(i => {
        const { isPrimary, localization, voiced, content } = i;

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
            voiced: {
                id: voiced.id,
                type: voiced.__typename,
                image: image.ProfileAny(voiced.images),
                name: locale.LatinAny(voiced.names),
                japaneseName: locale.Japanese(voiced.names),
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
        voiceActings: voiceActings,
    };
};

export default withContainer(VoiceActings);
