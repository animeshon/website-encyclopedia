import React from 'react';

import GetCharacters from '@/queries/GetCharacters';
import GetCast from '@/queries/GetCast';

import CharacterGrid from '@/components/Character/CharacterGrid';

import { Role } from '@/utilities/CharacterRole';
import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as uri from '@/utilities/URI';
import { FromAlpha2 } from '@/utilities/Nationality';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';

const CharacterPage = ({ characters, cast, nationalities }) => {
    return (
        <CharacterGrid characters={characters} cast={cast} nationalities={nationalities} />
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
