import React, { useState, useEffect } from 'react';

import Canonizable from '@/queries/Canonizable';

import CanonicalCard from '@/components/Canonical/CanonicalCard';
import ExpandableSection from '@/components/ExpandableSection';
import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ByContent } from '@/utilities/Premiere';
import * as stat from '@/utilities/ContentStatus';
import { Type } from '@/utilities/MediaType';

const CanonicalPage = ({ canonicals, universes }) => {
    return (
        <main>
            <section className="landing-section-box">
                <header>
                    <h3>Franchise</h3>
                </header>
                <ExpandableSection label={"Universe"} >
                    {universes && universes.length ? universes.map(u => {
                        return (<CanonicalCard key={u.id} item={u} />)
                    }) : "This content is not part of any Universe"}
                </ExpandableSection>
                <ExpandableSection label={"Series"} >
                    {canonicals && canonicals.length ? canonicals.map(c => {
                        return (<CanonicalCard key={c.id} item={c} />)
                    }) : "This content is not part of any Serie"}
                </ExpandableSection>
            </section>
        </main>

    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("canon", { id: id, firstContents: 4 }, Canonizable.Queries.canonicals),
        PrepareKeyQuery("uni", { id: id, firstContents: 4 }, Canonizable.Queries.universes),
    ];
    const { canon, uni } = await ExecuteQueryBatch(client, queries);

    const canonicals = (canon.partOfCanonicals || []).map(canonical => {
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
        canonicals: canonicals,
        universes: universes,
    };
};

export default CanonicalPage;
