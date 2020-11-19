import React from 'react';

import withContainer from '@/components/Container';
import getRelated from '@/queries/anime/Related';

import RelatedGrid from '@/components/RelatedGrid';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as contentRelation from '@/utilities/ContentRelation';
import * as stat from '@/utilities/ContentStatus';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Related = ({ related, highlighted }) => {
    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Related</h3>
                </header>
            </section>
            <div className="related grid-halves">
            { related && related.length ?
                (<RelatedGrid related={related} highlighted={highlighted} />)
                : 'There is currently no related content available.'}
            </div>
        </main>
    );
};

Related.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getRelated()));

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

export default withContainer(Related);
