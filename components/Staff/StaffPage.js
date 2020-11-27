import React from 'react';

import { GetTypedStaff } from '@/queries/GetStaff';
import getCollaboration from '@/queries/GetCollaboration';

import ExpandableSection from '@/components/ExpandableSection';
import StaffGrid from '@/components/Staff/StaffGrid';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as roles from '@/utilities/TypedRole';
import * as uri from '@/utilities/URI';
import { ExecuteQueryBatch, PrepareKeyQuery, PrepareQuery, ExecuteQueries } from '@/utilities/Query';

const MapStaff = (people) => {
    let mapStaff = {};
    people.forEach(v => {
        const k = v.role.type ? "typed" : "free";
        if (!mapStaff.hasOwnProperty(k)) {
            mapStaff[k] = {};
        }
        if (!mapStaff[k].hasOwnProperty(v.role.id)) {
            mapStaff[k][v.role.id] = {
                role: v.role,
                staff: [],
            };
        }
        mapStaff[k][v.role.id].staff.push(v.collaborator);
    });

    return mapStaff;
}
const StaffPage = ({ people }) => {
    const staffMap = MapStaff(people);

    const NotFound = 'There is currently no information about staff available.';
    const order = ["typed", "free"];

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header className="header-with-double-filter">
                    <h3>Staff</h3>
                </header>
                <div className="grid-halves">
                    {people?.length ? order.map(c => {
                        const collaborations = staffMap[c] ? staffMap[c] : {};
                        const rol = Object.keys(collaborations)
                        return rol?.map(rol => {
                            const coll = collaborations[rol];
                            return (
                                <ExpandableSection key={coll.role.id} label={coll.role.name} >
                                    <StaffGrid collaborations={coll}/>
                                </ExpandableSection>
                            )
                        })
                    }) : NotFound}
                </div>
            </section>
        </main>
    );
};

StaffPage.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const type = uri.GuessType(ctx);

    const queries = [
        PrepareKeyQuery("typedRoles", { id: id }, GetTypedStaff(type)),
    ];
    const { typedRoles } = await ExecuteQueryBatch(ctx, queries);

    // enqueue graphql query to get details
    const charQueries = typedRoles.staff?.map(x => {
        return PrepareQuery({ id: x.id }, getCollaboration());
    });
    // wait
    const collaborations = await ExecuteQueries(ctx, charQueries);

    const people = (collaborations || []).map(i => {
        const { role, collaborator, localization } = i;

        // TODO: Vastly improve the logic here.
        // Try to fetch country alpha-2, fallback to language alpha-2.
        var nationality = undefined;
        if (localization?.country?.alpha2) {
            nationality = localization.country.alpha2;
        }
        if (nationality === undefined && localization?.language?.alpha2) {
            nationality = localization.language.alpha2;
        }

        return {
            role: {
                name: role.names ? locale.EnglishAny(role.names) : roles.Role(role.type),
                type: role.type,
                id: role.id,
            },
            collaborator: {
                id: collaborator.id,
                type: collaborator.__typename,
                image: image.ProfileAny(collaborator.images),
                name: locale.LatinAny(collaborator.names),
                japaneseName: locale.Japanese(collaborator.names),
                gender: collaborator.gender,
                nationality: nationality,
            },
        };
    });

    return {
        people
    };
};

export default StaffPage;
