import * as anime from '@/queries/anime/Characters';
import * as manga from '@/queries/manga/Characters';
import * as lightNovel from '@/queries/light-novel/Characters';
import * as doujinshi from '@/queries/doujinshi/Characters';
import * as visualNovel from '@/queries/visual-novel/Characters';

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

const GetCharacters = (type) => {
    const typeToQuery = {
        "anime": anime.getCharacters,
        "manga": manga.getCharacters,
        "light-novels": lightNovel.getCharacters,
        "doujinshi": doujinshi.getCharacters,
        "visual-novels": visualNovel.getCharacters,
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };

  export default GetCharacters