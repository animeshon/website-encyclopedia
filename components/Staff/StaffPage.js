import React from 'react';

import { GetTypedStaff } from '@/queries/GetStaff';

import ExpandableSection from '@/components/ExpandableSection';
import StaffGrid from '@/components/Staff/StaffGrid';

import { ExecuteQueryBatch, PrepareKeyQuery } from '@/utilities/Query';

import Localization from "@/models/localization";
import { StaffDataModelList, SortBy } from "@/models/staff";

const StaffPage = ({ collaborators, localizations }) => {

    const staffModels = new StaffDataModelList(collaborators);
    staffModels.Localize();
    staffModels.Sort(SortBy.NAME);
    const roles = staffModels.GetAllJobs();

    const localizationsModel = localizations.map(l => Localization.FromRawData(l));
    // const nationalityOpts = localizationsModel.map(l => {
    //     return { value: l.GetLanguage().code, label: l.GetLanguage().HumanReadible() }
    // })

    const NotFound = 'There is currently no information about staff available.';
    const order = ["typed", "free"];

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Staff</h3>
                </header>
                <div className="grid-halves">
                    {staffModels.Size() ? roles.map(c => {
                        const collaborations = staffModels.GetByJobRole(c);
                        return (
                            <ExpandableSection key={c} label={collaborations[0].GetJobRole()} >
                                <StaffGrid collaborations={collaborations}/>
                            </ExpandableSection>
                        )
                    }) : NotFound}
                </div>
            </section>
        </main>
    );
};

export const getProps = async (ctx, client) => {
    const id = ctx.query.id.replace(".", "/");
    const queries = [
        PrepareKeyQuery("collab", {
            id: id,
            collaborator: true,
            content: false,
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
    const { collab } = await ExecuteQueryBatch(client, queries);

    const collaborators = collab.staff || [];

    const localizations = collaborators.map(v => v.localization).filter((localization, index, self) =>
        localization != undefined && index === self.findIndex((t) => (
            t.id === localization.id
        ))
    );

    return {
        collaborators,
        localizations,
    };
};

export default StaffPage;
