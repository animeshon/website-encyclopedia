
import * as anime from '@/queries/anime/Related';
import * as manga from '@/queries/manga/Related';
import * as lightNovel from '@/queries/light-novel/Related';
import * as doujinshi from '@/queries/doujinshi/Related';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

const GetRelated = (type) => {
    const typeToQuery = {
        "anime": anime.getRelated,
        "manga": manga.getRelated,
        "light-novels": lightNovel.getRelated,
        "doujinshi": doujinshi.getRelated,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };

  export default GetRelated