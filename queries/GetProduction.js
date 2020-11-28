
import * as person from '@/queries/person/Production';
import * as circle from '@/queries/circle/Production';
import * as organization from '@/queries/organization/Production';
import * as magazine from '@/queries/magazine/Production';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

export const GetTypedProduction = (type) => {
    const typeToQuery = {
        "people": person.getTypedProduction,
        "circles": circle.getTypedProduction,
        "organizations": organization.getTypedProduction,
        "magazines": magazine.getTypedProduction,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
};
