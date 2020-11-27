
import * as anime from '@/queries/anime/Staff';
import * as manga from '@/queries/manga/Staff';
import * as lightNovel from '@/queries/light-novel/Staff';
import * as doujinshi from '@/queries/doujinshi/Staff';
import * as visualNovel from '@/queries/visual-novel/Staff';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

export const GetTypedStaff = (type) => {
    const typeToQuery = {
        "anime": anime.getTypedStaff,
        "manga": manga.getTypedStaff,
        "light-novels": lightNovel.getTypedStaff,
        "doujinshi": doujinshi.getTypedStaff,
        "visual-novels": visualNovel.getTypedStaff,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };
