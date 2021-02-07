import React, { useState, useEffect } from 'react';

import GetCharacters from '@/queries/GetCharacters';
import GetCast from '@/queries/GetCast';

import CanonicalCard from '@/components/Canonical/CanonicalCard';
import ExpandableSection from '@/components/ExpandableSection';

const CanonicalPage = ({ canonicals, universes }) => {
    return (
        <main>
            <section className="landing-section-box">
                <header>
                    <h3>Franchise</h3>
                </header>
                <ExpandableSection label={"Universe"} >
                    {universes && universes.length ? universes.map(u => {
                        return (<CanonicalCard item={u} />)
                    }) : "This content is not part of any Universe"}
                </ExpandableSection>
                <ExpandableSection label={"Series"} >
                    {canonicals && canonicals.length ? canonicals.map(c => {
                        return (<CanonicalCard item={c} />)
                    }) : "This content is not part of any Serie"}
                </ExpandableSection>
            </section>
        </main>

    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;
    // const queries = [
    //     PrepareKeyQuery("data", { id: id }, GetCharacters(type)),
    //     PrepareKeyQuery("cast", { id: id }, GetCast(type)),
    // ];
    // const { data, cast } = await ExecuteQueryBatch(client, queries);

    return {
        canonicals: [
            {
                id: "123",
                name: "Naruto",
                type: "Canonical",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            },
            {
                id: "123",
                name: "Naruto",
                type: "Canonical",
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            }
        ],
        // universes: [
        //     {
        //         id: "123",
        //         name: "Naruto",
        //         type: "Canonical",
        //         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        //     }
        // ]
    };
};

export default CanonicalPage;
