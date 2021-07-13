import * as unicode from '@/utilities/Unicode';

const BASEPATH = process.env.NEXT_PUBLIC_BASEPATH || '';
const HOST = process.env.NEXT_PUBLIC_HOST || 'http://127.0.0.1:3000';

export const Rewrite = (type, name, id, path = null) => {
    switch (type) {
        case 'Anime':
            return rewrite('Anime', name, id, path);
        case 'Manga':
            return rewrite('Manga', name, id, path);
        case 'Doujinshi':
            return rewrite('Doujinshi', name, id, path);
        case 'Song':
            return rewrite('Track', name, id, path);
        case 'LightNovel':
            return rewrite('Light_Novel', name, id, path);
        case 'VisualNovel':
            return rewrite('Visual_Novel', name, id, path);
        
        case 'Release':
            return rewrite('Release', name, id, path);
        case 'Chapter':
            return rewrite('Chapter', name, id, path);
        case 'Volume':
            return rewrite('Volume', name, id, path);
        case 'MusicCollection':
            return rewrite('Music_Record', name, id, path);
        case 'Episode':
            return rewrite('Episode', name, id, path);
        
        case 'Organization':
            return rewrite('Organization', name, id, path);
        case 'Character':
            return rewrite('Character', name, id, path);
        case 'Person':
            return rewrite('Person', name, id, path);
        case 'Circle':
            return rewrite('Circle', name, id, path);
        case 'Convention':
            return rewrite('Convention', name, id, path);
        case 'Magazine':
            return rewrite('Magazine', name, id, path);
        
        case 'Universe':
            return rewrite('Universe', name, id, path);
        case 'Canonical':
            return rewrite('Series', name, id, path);

        case 'VisualNovelRelease':
            return rewrite('Release', name, id, path);
    };

    return undefined;
};

export const rewrite = (type, name, id, path) => {
    if (!path) {
        return `/${removeSymbols(name)}-${type}-${id}`;
    }

    return `/${removeSymbols(name)}-${type}-${id}/${path}`;
};

const removeSymbols = (input) => {
    if (!input) {
        return '_';
    }

    input = input.trim();

    var wasLastSpecial = false;
    var result = '';

    for (var k = 0; k < Math.min(input.length, 64); k++) {
        const i = input.charCodeAt(k);

        const isSpecial = [unicode.Symbol, unicode.Punct, unicode.Space, unicode.Other].some(e => {
            if (unicode.Is(e, i)) {
                if (!wasLastSpecial) {
                    wasLastSpecial = true;
                    result += '_';
                }

                return true;
            }
        });

        if (!isSpecial) {
            result += String.fromCharCode(i);
            wasLastSpecial = false;
        }
    }

    return result;
};

export const AbsoluteURI = (uri) => {
    return HOST + BASEPATH + uri;
};

export const CanonicalURI = (pathname, id) => {
    return AbsoluteURI(pathname.replace('[id]', id));
};
