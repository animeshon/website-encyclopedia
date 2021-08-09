import React from 'react';

import GetSummary from '@/queries/GetSummary';

import DetailsCard from '@/components/DetailsCard';
import SummaryText from '@/components/Summary/SummaryText';
import RelatedGrid from '@/components/Related/RelatedGrid';
import ExternalDistributors from '@/components/ExternalDistributors';

import { PrepareKeyQuery, ExecuteQueryBatch } from '@/utilities/Query';

import SummaryDataType from '@/models/summary';
import EntityList from '@/models/entity-list';

import withContainer, { withContainerProps } from '@/components/Container';

const ReleasePage = ({
    info
}) => {
    const model = new SummaryDataType(info);
    model.Localize();

    const contents = EntityList.DefaultFromRawData(info.releaseContents);
    contents.Localize();

    const shops = model.GetShops();

    return (
        <div className="grid">
            <main className="landing__description">
                {shops.length ? <ExternalDistributors shops={shops} /> : undefined}
                <SummaryText text={model.GetDescription()} />
                <section className="landing-section-box">
                    <header>
                        <h3>Contents</h3>
                    </header>
                    <div className="related grid-halves">
                        <RelatedGrid related={contents} />
                    </div>
                </section>
            </main>
            <aside className="landing__details">
                <header>
                    <h3>Details</h3>
                </header>
                <DetailsCard items={model.Details()} />
            </aside>
        </div>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const queries = [
        PrepareKeyQuery("info", { id: id }, GetSummary()),
    ];
    const { info } = await ExecuteQueryBatch(client, queries);

    // const releaseOf = (info.contents || []).map(i => {
    //     const { id, __typename, status, runnings, descriptions, releaseDate, images, names, ageRatings } = i;
    //     if (names.length === 0) {
    //         return;
    //     }
    //     return {
    //         id: id,
    //         type: __typename,
    //         name: locale.EnglishAny(names),
    //         description: locale.EnglishAny(descriptions),
    //         image: image.ProfileAny(images, ageRatings),
    //         media: Type(__typename),
    //         releaseDate: ByContent(__typename, releaseDate, runnings),
    //         status: stat.Status(status),
    //     };
    // });

    return {
        info
    };
};

export default withContainer(ReleasePage);
export const getServerSideProps = withContainerProps(getProps);