import uniq from 'lodash/uniq';

// TODO: Vastly improve the logic here.
// TODO: The name could actually be retrieved directly from GraphQL.
export const FromAlpha2 = (codes) => {
    const m = uniq(codes).map(code => {
        switch (code) {
            case 'jp':
            case 'ja':
                return {
                    code: 'jp',
                    name: 'Japanese',
                };
            case 'de':
                return {
                    code,
                    name: 'German',
                };
            case 'es':
                return {
                    code,
                    name: 'Spanish',
                };
            case 'en':
                return {
                    code: 'us',
                    name: 'English',
                };
            case 'fr':
                return {
                    code,
                    name: 'French',
                };
            case 'it':
                return {
                    code,
                    name: 'Italian',
                };
            case 'pt':
            case 'br':
                return {
                    code: 'br',
                    name: 'Portuguese',
                };
            case 'fi':
                return {
                    code,
                    name: 'Finnish',
                };
            case 'pl':
                return {
                    code,
                    name: 'Polish',
                };
            case 'ro':
                return {
                    code,
                    name: 'Romanian',
                };
            case 'kr':
            case 'ko':
                return {
                    code: 'kr',
                    name: 'Korean',
                };
            case 'zh':
                return {
                    code: 'cn',
                    name: 'Chinese',
                };
            case 'cs':
                return {
                    code: 'cz',
                    name: '	Czech',
                };
            case 'ru':
                return {
                    code: 'ru',
                    name: 'Russian',
                };
            case 'tr':
                return {
                    code: 'tr',
                    name: 'Turkish',
                };
            case 'vi':
                return {
                    code: 'vn',
                    name: 'Vietnamese',
                };
            case 'he':
                return {
                    code: 'il',
                    name: 'Hebrew',
                };
            case 'hu':
                return {
                    code: 'hu',
                    name: 'Hungarian',
                };
            case undefined:
                return {
                    code: undefined,
                    name: 'Unknown',
                };
            default:
                return {
                    code,
                    name: code,
                };
        }
    });

    var nationalities = m.filter((v,i,a)=>a.findIndex(t=>(t.code === v.code && t.name===v.name))===i);
    return nationalities.sort();
};