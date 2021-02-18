import React from 'react';

import { GetTypedProduction } from '@/queries/GetProduction';

import ProductionCard from '@/components/Production/ProductionCard';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import * as roles from '@/utilities/TypedRole';
import { byContent } from '@/utilities/Premiere';
import * as stat from '@/utilities/ContentStatus';
import * as uri from '@/utilities/URI';
import { Type } from '@/utilities/MediaType';
import { ExecuteQueryBatch, PrepareKeyQuery, PrepareQuery, ExecuteQueries } from '@/utilities/Query';

const MapProductions = (productions) => {
    let mapProductions = {};
    productions.forEach(v => {
        const contentID = v.content.id;
        // prune not handled resources (which are release for now)
        if (undefined === contentID) {
            return;
        }
        const k = v.role.type ? "typed" : "free";
        if (!mapProductions.hasOwnProperty(contentID)) {
            mapProductions[contentID] = {
                ...v.content,
                roles: {},
            };
        }
        if (!mapProductions[contentID].roles.hasOwnProperty(k)) {
            mapProductions[contentID].roles[k] = [];
        }
        mapProductions[contentID].roles[k].push(v.role);
    });
    return mapProductions;
}
const ProductionPage = ({ productions }) => {
    const productionsMap = MapProductions(productions);

    const keys = Object.keys(productionsMap).sort((x, y) => {
        return productionsMap[x].name < productionsMap[y].name ? -1 : productionsMap[x].name > productionsMap[y].name;
    });

    const NotFound = 'There is currently no information about productions available.';

    return (
        <main className="anime-characters__description grid">
            <section className="landing-section-box">
                <header>
                    <h3>Productions</h3>
                </header>
                <div className="grid-halves">
                    {keys.length ? keys.map(c => {
                        const production = productionsMap[c];
                        return (<ProductionCard key={production.id} production={production} />)
                    }) : NotFound}
                </div>
            </section>
        </main>
    );
};

export const getProps = async (ctx, client, type) => {
    const { id } = ctx.query;

    const queries = [
        PrepareKeyQuery("typedProduction", { id: id, content: true, collaborator: false }, GetTypedProduction(type)),
    ];
    const { typedProduction } = await ExecuteQueryBatch(client, queries);

    const productions = (typedProduction.collaborations || []).map(i => {
        const { role, content, localization } = i;

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
            content: {
                id: content.id,
                type: content.__typename,
                name: locale.EnglishAny(content.names),
                japaneseName: locale.Japanese(content.names),
                image: image.ProfileAny(content.images, content.ageRatings),
                media: Type(content.__typename),
                releaseDate: ByContent(content.__typename, content.releaseDate, content.runnings),
                status: stat.Status(content.status),
            },
        };
    });

    return {
        productions
    };
};

export default ProductionPage;
