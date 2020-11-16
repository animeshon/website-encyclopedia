import * as unicode from 'utilities/Unicode';

export const Rewrite = (__typename, name, id, path = null) => {
    switch (__typename) {
        case 'Anime':
            return rewrite('Anime', name, id, path);
        case 'Manga':
            return rewrite('Manga', name, id, path);
        case 'Doujinshi':
            return rewrite('Doujinshi', name, id, path);
        case 'Track':
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
        case 'Soundtrack':
            return rewrite('Soundtrack', name, id, path);
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
        
        case 'Universe':
            return rewrite('Universe', name, id, path);
        case 'Canonical':
            return rewrite('Canonical_Franchise', name, id, path);
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

    for (var k = 0; k < input.length; k++) {
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

