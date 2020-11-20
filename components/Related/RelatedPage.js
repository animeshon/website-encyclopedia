import React from 'react';

import GetRelated from '@/queries/GetRelated';

import RelatedGrid from '@/components/Related/RelatedGrid';
import ExpandableSection from '@/components/ExpandableSection';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as contentRelation from '@/utilities/ContentRelation';
import * as stat from '@/utilities/ContentStatus';
import * as uri from '@/utilities/URI';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const MapAndSort = (array) => {
    const mapRelated = {};
    (array || []).forEach(i => {
        if (mapRelated[i.relationType] === undefined) {
            mapRelated[i.relationType] = {
                type: i.relation,
                items: [],
            };
        }
        mapRelated[i.relationType].items.push(i);
    });

    Object.keys(mapRelated).map(i => {
        (mapRelated[i].items || []).sort((x, y) => { return x.name < y.name ? -1 : x.name > y.name; });
    });

    return mapRelated;
}


const RelatedPage = ({ related, highlighted }) => {
    const mapRelated = MapAndSort(related);
    const k = Object.keys(mapRelated);
    const keys = highlighted.concat(k.filter(e => !highlighted.includes(e)));

    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Related</h3>
                </header>
            </section>
            { related && related.length ? keys.map(i => {
                return mapRelated[i] ? (<ExpandableSection key={i} label={mapRelated[i].type}>
                    <RelatedGrid related={mapRelated[i].items} />
                </ExpandableSection>) : undefined;
            })
                : 'There is currently no related content available.'}
        </main>
    );
};

RelatedPage.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const type = uri.GuessType(ctx);
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, GetRelated(type)));

    const related = (data.relations || []).map(i => {
        const { id, __typename, status, runnings, images, names, ageRatings } = i.object;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            image: image.ProfileAny(images, ageRatings),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            season: season.JapanAny(runnings),
            status: stat.Status(status),
            relation: contentRelation.Type(i.type),
            relationType: i.type,
        };
    });
    const highlighted = ["ADAPTATION", "BASE", "PREQUEL", "SEQUEL"];
    return {
        related: related,
        highlighted: highlighted,
    };
};

export default RelatedPage;