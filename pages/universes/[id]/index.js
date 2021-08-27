import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import getSummary from '@/queries/universe/Summary';

import SummaryText from '@/components/Summary/SummaryText';
import SummaryCharacter from '@/components/Summary/SummaryCharacter';
import DetailsCard from '@/components/DetailsCard';

import * as locale from '@/utilities/Localization';
import { PrepareKeyQuery, ExecuteQueryBatch } from '@/utilities/Query';
import SummaryCanonical from '@/components/Summary/SummaryCanonical';

const Canonical = ({
    description,
    characters,
    details,
    canonicals,
}) => {
    return (
        <div className="grid">
            <main className="landing__description">
                <SummaryText text={description} />
                <SummaryCharacter characters={characters} showMore={false} />
                <SummaryCanonical canonicals={canonicals} path={"series"}/>
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <DetailsCard items={details} />
            </aside>
        </div>
    );
};

export const getProps = async (ctx, client) => {
    const { id } = ctx.query;
    const queries = [
        PrepareKeyQuery("info", { id: id }, getSummary()),
    ];
    const { info } = await ExecuteQueryBatch(client, queries);

    const characters = [];
    info.contents.forEach(c => {
        c.starring.forEach(s => {
            const { id, images, names } = s.character;
            const hit = characters.filter(c => {return c.id == id});
            if (hit.length != 0) {
                hit[0].occurencies++;
            } else {
                characters.push({
                    id: id,
                    name: locale.LatinAny(names),
                    image: image.ProfileAny(images),
                    occurencies: 1,
                })
            }
        })
    })

    const canonicals = (info.canonicals || []).map(canonical => {
        const { id, __typename, images, names, ageRatings } = canonical;
        return {
            id: id,
            type: __typename,
            name: locale.EnglishAny(names),
            // image: image.ProfileAny(images, ageRatings),
        }
    });

    return {
        description: locale.English(info.descriptions),
        characters: characters.sort((a, b) => {
            return a.occurencies < b.occurencies;
        }).slice(0, 5),
        canonicals: canonicals,
        details: [
            [
                { key: 'English', value: locale.English(info.names) },
                { key: 'Japanese', value: locale.Japanese(info.names) },
                { key: 'Romaji', value: locale.Romaji(info.names) },
            ],
            [
                { key: 'Contents', value: info.contentsAggregate?.count || 0 },
                { key: 'Series', value: info.canonicalsAggregate?.count || 0 },
            ]
        ]
    };
};

export default withContainer(Canonical);
export const getServerSideProps = withContainerProps(getProps);
