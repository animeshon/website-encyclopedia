import * as visualNovel from '@/queries/visual-novel/Release';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3


// ! aliases on fragments are not working
// ! https://github.com/apollographql/apollo-server/issues/4912
// ! https://github.com/ardatan/graphql-tools/issues/2568


const GetReleases = (type) => {
    const typeToQuery = {
        "visual-novels": visualNovel.getReleases,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };

  export default GetReleases