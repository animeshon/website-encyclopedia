import React from 'react';

import { GetTypedStaff } from '@/queries/GetStaff';
import GetSummary from '@/queries/GetSummary';
import GetRelated from '@/queries/GetRelated';

import DetailsCard from '@/components/DetailsCard';
import SummaryText from '@/components/Summary/SummaryText';
import SummaryCharacter from '@/components/Summary/SummaryCharacter';
// import SummaryTimeline from '@/components/Summary/SummaryTimeline';
import SummaryCanonical from '@/components/Summary/SummaryCanonical';
import SummaryRelated from '@/components/Summary/SummaryRelated';
import ExternalDistributors from '@/components/ExternalDistributors';

import * as locale from '@/utilities/Localization';
import * as uri from '@/utilities/URI';

import { ExecuteQueryBatch, PrepareKeyQuery, PrepareQuery, ExecuteQueries } from '@/utilities/Query';

import SummaryDataType from '@/models/summary';
import { CharacterDataModelList } from '@/models/character';
import { RelatedContentDataModelList } from '@/models/related-content';

const ContentPage = ({
    info,
    characters,
    relatedContents,
    collaborators
}) => {
    const model = new SummaryDataType();
    model.loadRawData(info);
    model.SetCollaborators(collaborators);
    model.Localize();

    const characterModels = CharacterDataModelList.FromCharacterRawData(characters);
    characterModels.Localize();

    const relatedModels = RelatedContentDataModelList.FromRelatedRawData(relatedContents);
    relatedModels.Localize();

    const shops = model.GetShops();

    return (
        <div className="grid">
            <main className="landing__description">
                {shops.length ? <ExternalDistributors shops={shops}/> : undefined}
                <SummaryText text={model.GetDescription()} />
                <SummaryCharacter characters={characterModels} />
                <SummaryRelated related={relatedModels} />
                {/* <SummaryTimeline /> */}
                {/* {canonicals && <SummaryCanonical canonicals={canonicals} />} */}
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
        PrepareKeyQuery("related", { id: id }, GetRelated()),
        PrepareKeyQuery("collaborators", {
            id: id,
            collaborator: true,
            content: false,
            roleIn: [
                "ART_DIRECTION",
                "AUTHOR",
                "DIRECTION",
                "CHARACTER_DESIGN",
                "MUSIC_COMPOSITION",
                "PRODUCTION",
                "STORY",
                "ILLUSTRATION",
                "STUDIO",
                "VOCALIST"]
        }, GetTypedStaff()),
    ];

    const { info, related, collaborators } = await ExecuteQueryBatch(client, queries);

    // const universes = (info.partOfUniverses || []).map(universe => {
    //     return {
    //         href: uri.Rewrite(locale.EnglishAny(universe.names), universe.id),
    //         text: locale.EnglishAny(universe.names),
    //     }
    // });

    // const canonicals = (info.partOfCanonicals || []).map(canon => {
    //     const { id, entityType, images, names, maturityRatings } = canon;
    //     return {
    //         id: id,
    //         type: entityType,
    //         name: locale.EnglishAny(names),
    //         // image: image.ProfileAny(images, maturityRatings),
    //     }
    // });

    return {
        info,
        characters: info.starring || [],
        relatedContents: related.relations || [],
        collaborators: collaborators.staff || [],
    };
};

export default ContentPage;
