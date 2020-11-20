import React from 'react';

import withContainer from '@/components/Container';
import getAppearances from '@/queries/character/Appearances';

import AppearanceGrid, { PruneInvalidAppearances } from '@/components/Appearance/AppearanceGrid';
import ExpandableSection from '@/components/ExpandableSection';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as stat from '@/utilities/ContentStatus';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const MapAndSort = (array) => {
    const mapAppearances = {};
    (PruneInvalidAppearances(array) || []).forEach(i => {
        if (mapAppearances[i.type] === undefined) {
            mapAppearances[i.type] = [];
        }
        mapAppearances[i.type].push(i);
    });

    Object.keys(mapAppearances).map(i => {
        (mapAppearances[i] || []).sort((x, y) => { return x.name < y.name ? -1 : x.name > y.name; });
    });

    return mapAppearances;
}

const Appearances = ({ appearances }) => {
    const mapAppearances = MapAndSort(appearances);
    const keys = Object.keys(mapAppearances);

    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Appearances</h3>
                </header>
            </section>
            <div className="appearances grid-halves">
                {appearances && appearances.length ?
                    keys.map(i => {
                        return (<ExpandableSection key={i} label={Type(i)}>
                            <AppearanceGrid appearances={mapAppearances[i]} />
                        </ExpandableSection>)
                    })
                    : 'There is currently no appearance information available.'}
            </div>
        </main>
    );
};

Appearances.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id, first: 1000000000 }, getAppearances()));

    const appearances = (data.appearance || []).map(i => {
        const { id, __typename, status, runnings, images, descriptions, names, ageRatings } = i.content;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images, ageRatings),
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
