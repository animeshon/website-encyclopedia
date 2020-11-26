
import * as anime from '@/queries/anime/Summary';
import * as manga from '@/queries/manga/Summary';
import * as lightNovel from '@/queries/light-novel/Summary';
import * as doujinshi from '@/queries/doujinshi/Summary';
import * as visualNovel from '@/queries/visual-novel/Summary';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

const GetContentSummary = (type) => {
    const typeToQuery = {
        "anime": anime.getSummary,
        "manga": manga.getSummary,
        "light-novels": lightNovel.getSummary,
        "doujinshi": doujinshi.getSummary,
        "visual-novels": visualNovel.getSummary,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };

  export default GetContentSummary