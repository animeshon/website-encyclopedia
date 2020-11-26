
import * as anime from '@/queries/anime/Cast';
import * as visualNovel from '@/queries/visual-novel/Cast';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

const GetCast = (type) => {
    const typeToQuery = {
        "anime": anime.getCast,
        "visual-novels": visualNovel.getCast,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };

  export default GetCast