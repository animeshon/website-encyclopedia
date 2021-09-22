import * as unicode from '@/utilities/Unicode';

const BASEPATH = process.env.NEXT_PUBLIC_BASEPATH || '';
const HOST = process.env.NEXT_PUBLIC_HOST || 'http://127.0.0.1:3000';

export const Rewrite = (name, id, path = null) => {
    return rewrite(name, id, path);
};

export const rewrite = (name, id, path) => {
    if (!path) {
        return `/${id}/${removeSymbols(name)}`;
    }

    return `/${id}/${removeSymbols(name)}/${path}`;
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