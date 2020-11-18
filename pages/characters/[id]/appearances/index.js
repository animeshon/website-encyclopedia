import React from 'react';

import withContainer from '@/components/Container';
import getAppearances from '@/queries/character/Appearances';

import AppearanceGrid from '@/components/AppearanceGrid';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as uri from '@/utilities/URI';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Appearances = ({ appearances }) => {
    return (
            <main className="landing__description">
                <section className="landing-section-box">
                    <header>
                        <h3>Appearances</h3>
                    </header>
                </section>
                <div className="appearances grid-halves">
                { appearances && appearances.length ?
                    (<AppearanceGrid appearances={appearances} />)
                    : 'There is currently no appearance information available.'}
                </div>
            </main>
    );
};

Appearances.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id, first: 1000000000 }, getAppearances()));

    const appearances = (data.appearance || []).map(i => {
        const { id, __typename, status, runnings, images, descriptions, names } = i.content;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            description: locale.English(descriptions),
            season: season.JapanAny(runnings),
            status: stat.Status(status),
            relation: i.relation,
        };
    });
    return {
        appearances: appearances
    };
};

export default withContainer(Appearances);
