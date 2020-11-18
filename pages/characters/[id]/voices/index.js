import React from 'react';

import withContainer from '@/components/Container';

import getVoiceActors from '@/queries/character/VoiceActors';

import {CardImageGender} from '@/components/Card/Image';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';
import { SafeSearch } from '@/utilities/SafeSearch';


import Link from 'next/link';

import Button from '@/components/Button';

const Gender = (role) => {
    switch (role) {
        case "MALE":
            return "Male";
        case "FEMALE":
            return "Female";
    }

    return undefined;
};

const VoiceActorCard = ({ voiceActor }) => {
    return (
        <article className="voice-actor">
            <CardImageGender
                sex={voiceActor.gender}
                picture={voiceActor.image}
                altText={voiceActor.name}
                className={""}
            />
            <div className="voice-actor__descriptions">
                <header>
                    <h4>
                        {voiceActor.name}
                    </h4>
                    {voiceActor.japaneseName && (
                        <h5> {voiceActor.japaneseName} </h5>
                    )}
                    <p className="appearences__media-type">
                        {voiceActor.nationality && (<span
                            className={`fp fp-sm custom-fp ${voiceActor.nationality == 'en' ? 'gb': voiceActor.nationality}`}
                        />)}
                        {Gender(voiceActor.gender) && (
                            <h5> {Gender(voiceActor.gender)} </h5>
                        )}
                    </p>
                </header>
                <Button
                    className="cherry-red medium"
                    href={uri.Rewrite('Person', voiceActor.name, voiceActor.id)}
                    type="next-link"
                >
                    More
                    </Button>
            </div>
            <aside>
                {voiceActor.productions.map(production => {
                    return (
                        <p>
                            <Link href={uri.Rewrite(production.type, production.name, production.id)} >
                                <a>{production.name}</a>
                            </Link>
                        </p>
                    );
                })}
            </aside>
        </article>
    );
};

const MapVoiceActors = (voiceActors) => {
    let mapVoiceActors = {};
    voiceActors.forEach(v => {
        if (!mapVoiceActors.hasOwnProperty(v.actor.id)) {
            mapVoiceActors[v.actor.id] = {
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
    const keys = Object.keys(mapVoiceActors);
    return (
        <main className="landing__description landing__100">
            <section className="landing-section-box">
                <header>
                    <h3>Voice Actors</h3>
                </header>
            </section>
            <div className="grid-halves">
             { keys && keys.length ? keys.map(k => {
                 return (<VoiceActorCard key={k} voiceActor={mapVoiceActors[k]}/>)
             }): 'There is currently no appearance information available.'}
            </div>
        </main>
    );
};

VoiceActors.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getVoiceActors()));
    const isSafeSearch = SafeSearch(ctx);

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
                image: image.ProfileAny(actor.images, isSafeSearch),
                name: locale.LatinAny(actor.names),
                japaneseName: locale.Japanese(actor.names),
                gender: actor.gender,
            },
            content: {
                id: content.id,
                type: content.__typename,
                name: locale.LatinAny(content.names),
                japaneseName: locale.Japanese(content.names),
            }
        };
    });

    return {
        voiceActors: voiceActors,
    };
};

export default withContainer(VoiceActors);
