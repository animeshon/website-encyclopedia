import React from 'react';

import getAnimeCast from '@/queries/anime/Cast';

import CastGrid from '@/components/CastGrid';
import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';
import { FromAlpha2 } from '@/utilities/Nationality';

const AnimeCast = ({ casts, nationalities }) => {
    return (<CastGrid casts={casts} nationalities={nationalities} />);
};

AnimeCast.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id: id }, getAnimeCast(), (data, err) => { return data.result; });

    const nationalities = [];
    const casts = (data.voiceActings || []).map(member => {
        const { actor, voiced, localization } = member;

        // TODO: Vastly improve the logic here.
        // Try to fetch country alpha-2, fallback to language alpha-2.
        var nationality = undefined;
        if (localization?.country?.alpha2) {
            nationality = localization.country.alpha2;
        } else if (localization?.language?.alpha2) {
            nationality = localization.language.alpha2;
        }

        nationality = nationality?.toLowerCase();
        nationalities.push(nationality);

        return {
            nationality: FromAlpha2([nationality])[0]?.code,
            character: {
                id: voiced.id,
                type: voiced.__typename,
                name: locale.LatinAny(voiced.names),
                image: image.ProfileAny(voiced.images),
                // TODO: Maybe we should add the character role?
            },
            person: {
                id: actor.id,
                name: locale.LatinAny(actor.names),
                japaneseName: locale.Japanese(actor.names),
                image: image.ProfileAny(actor.images),
                // TODO: Add field 'gender'.
            }
        };
    });

    return {
        casts: casts,
        nationalities: FromAlpha2(nationalities)
    };
};

export default withContainer(AnimeCast);
