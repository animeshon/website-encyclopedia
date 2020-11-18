import React from 'react';

import withContainer from '@/components/Container';
import getRelated from '@/queries/doujinshi/Related';

import RelatedGrid from '@/components/RelatedGrid';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as season from '@/utilities/Season';
import * as contentRelation from '@/utilities/ContentRelation';
import * as stat from '@/utilities/ContentStatus';
import { Type } from '@/utilities/MediaType';
import { Subtype } from '@/utilities/MediaSubtype';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const Related = ({ related, open }) => {
    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Related</h3>
                </header>
            </section>
            <div className="related grid-halves">
            { related && related.length ?
                (<RelatedGrid related={related} openDefault={open} />)
                : 'There is currently no related content available.'}
            </div>
        </main>
    );
};

Related.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getRelated()));

    const related = (data.relations || []).map(i => {
        const { id, __typename, status, runnings, images, names } = i.object;
        if (names.length === 0) {
            return;
        }
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            image: image.ProfileAny(images),
            media: Type(__typename),
            //type: Subtype(__typename, type),
            season: season.JapanAny(runnings),
            status: stat.Status(status),
            relation: contentRelation.Type(i.type),
            relationType: i.type,
        };
    });
    const open = ["ADAPTATION", "BASE", "PREQUEL", "SEQUEL"];
    return {
        related: related,
        open: open,
    };
};

export default withContainer(Related);
