import React from 'react';

import { GetTypedStaff } from '@/queries/GetStaff';
import ProductionCard from '@/components/Production/ProductionCard';

import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';
import { ProductionModelList } from '@/models/production';
import { SortBy } from '@/models/entity-list';

const ProductionPage = ({ productions }) => {
    const productionModels = ProductionModelList.FromRawData(productions, "content");
    productionModels.Localize();
    productionModels.Sort(SortBy.NAME);

    const NotFound = 'There is currently no information about productions available.';

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Productions</h3>
                </header>
                <div className="grid-halves">
                    {productionModels.Size() ? productionModels.map(p => {
                        return (<ProductionCard key={p.GetID()} production={p} />)
                    }) : NotFound}
                </div>
            </section>
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const queries = [
        PrepareKeyQuery("productions", {
            id: id,
            collaborator: false,
            content: true,
            roleIn: [
                "ART_DIRECTION",
                "AUTHOR",
                "DIRECTION",
                "CHARACTER_DESIGN",
                "MUSIC_COMPOSITION",
                "LYRICS",
                "PRODUCTION",
                "MUSIC_ARRANGEMENT",
                "PUBLISHING",
                "STORY",
                "SCRIPT",
                "SERIALIZATION",
                "ILLUSTRATION",
                "STUDIO",
                "VOCALIST"]
        }, GetTypedStaff()),
    ];

    const { productions } = await ExecuteQueryBatch(client, queries);

    return {
        productions: productions.collaborations || []
    };
};

export default ProductionPage;
