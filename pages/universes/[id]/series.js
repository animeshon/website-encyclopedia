import React, { useState, useEffect } from 'react';
import withContainer, { withContainerProps } from '@/components/Container';

import CanonicalCard from '@/components/Canonical/CanonicalCard';
import ExpandableSection from '@/components/ExpandableSection';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ByContent } from '@/utilities/Premiere';
import * as stat from '@/utilities/ContentStatus';
import { Type } from '@/utilities/MediaType';

import getCanonicals from '@/queries/universe/Canonical';

const Universes = ({ canonicals }) => {
    return (
        <main>
            <section className="landing-section-box">
                <header>
                    <h3>Series</h3>
                </header>
                {canonicals && canonicals.length ? canonicals.map(u => {
                    return (<CanonicalCard key={u.id} item={u} />)
                }) : "This Universe do not have any Series."}
            </section>
        </main>
    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("canon", { id: id, firstContents: 10 }, getCanonicals()),
    ];
    const { canon } = await ExecuteQueryBatch(client, queries);

    const canonicals = (canon?.canonicals || []).map(canonical => {
        const { id, __typename, images, descriptions, names, ageRatings } = canonical;
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            description: locale.EnglishAny(descriptions),
            image: image.ProfileAny(images, ageRatings),
            contents: (canonical.contents || []).map(content => {
                const { id, __typename, status, runnings, images, names, descriptions, ageRatings, releaseDate } = content;
                return {
                    id: id,
                    type: __typename,
                    name: locale.EnglishAny(names),
                    description: locale.EnglishAny(descriptions),
                    image: image.ProfileAny(images, ageRatings),
                    media: Type(__typename),
                    releaseDate: ByContent(__typename, releaseDate, runnings),
                    status: stat.Status(status),
                };
            })
        }
    })

    return {
        canonicals: canonicals,
    };
};

export default withContainer(Universes);
export const getServerSideProps = withContainerProps(getProps);
