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

import getUniverses from '@/queries/canonical/Universes';

const Universes = ({ universes }) => {
    return (
        <main>
            <section className="landing-section-box">
                <header>
                    <h3>Universes</h3>
                </header>
                {universes && universes.length ? universes.map(u => {
                    return (<CanonicalCard key={u.id} item={u} />)
                }) : "This Series is not part of any Universe"}
            </section>
        </main>

    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("uni", { id: id, firstContents: 10 }, getUniverses()),
    ];
    const { uni } = await ExecuteQueryBatch(client, queries);

    const universes = (uni?.partOfUniverses || []).map(universe => {
        const { id, __typename, images, descriptions, names, ageRatings } = universe;
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            description: locale.EnglishAny(descriptions),
            image: image.ProfileAny(images, ageRatings),
            contents: (universe.contents || []).map(content => {
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
        universes: universes,
    };
};

export default withContainer(Universes);
export const getServerSideProps = withContainerProps(getProps);
