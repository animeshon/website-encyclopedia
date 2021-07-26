// Default fallback chain for any text expected in latin script,
// always returns if 'values' is not undefined or empty.
export const fallbackLatinAny = [
    { // Case 1: Attempt to fetch content in English.
        languages: ['eng'],
    },
    { // Case 2: Attempt to fetch content in Romaji.
        languages: ['jpn'],
        scripts: ['Latn'],
    },
    { // Case 2.5: Attempt to fetch content in Romaji. (requireing language to be null or undefined)
        languages: [undefined, null],
        scripts: ['Latn'],
    },
    { // Case 3: Attempt to fetch content in Japanese.
        languages: ['jpn'],
    },
    { // Case 4: Attempt to fetch content in any of 'mul' or 'und'.
        languages: ['mul', 'und'],
    },
    { // Case 5: Return the first text, don't care about localization.
    }
];

// Default fallback chain for any text expected in latin script,
// returns a defined value ony if a Latin text is found.
export const fallbackLatinOnly = [
    { // Case 1: Attempt to fetch content in English.
        languages: ['eng'],
    },
    { // Case 2: Attempt to fetch content in Romaji.
        languages: ['jpn'],
        scripts: ['Latn'],
    },
];

// Default fallback chain for any text expected in latin script,
// always returns if 'values' is not undefined or empty.
export const fallbackScriptAny = [
    { // Case 1: Attempt to fetch content in Japanese script.
        scripts: ['Jpan'],
    },
    { // Case 2: Return the first text, don't care about localization.
    },
];

export const LatinAny = (values) => {
    return Locale(values?.hits, [], ['Latn'], [], fallbackScriptAny)
};

export const Japanese = (values) => {
    return Locale(values?.hits, ['jpn'], ['Jpan'])
};

export const Romaji = (values) => {
    return Locale(values?.hits, ['jpn'], ['Latn'])
};

export const English = (values) => {
    return Locale(values?.hits, ['eng'], ['Latn'])
};

export const JapaneseAny = (values) => {
    return Locale(values?.hits, ['jpn'], ['Jpan'], [], fallbackLatinAny)
};

export const EnglishAny = (values) => {
    return Locale(values?.hits, ['eng'], ['Latn'], [], fallbackLatinAny)
};

export const Locale = (values, languages = [], scripts = [], countries = [], fallback = null) => {
    if (!values || values.length == 0) {
        return undefined;
    }

    for (var i = 0; i < values.length; i++) {
        if (!values[i].localization && (languages || scripts || countries)) {
            continue;
        }
        
        if (languages && languages.length != 0) {
            const language = values[i].localization.language?.code;
            if (!languages.includes(language)) {
                continue;
            }
        }

        if (scripts && scripts.length != 0) {
            const script = values[i].localization.script?.code;
            if (!script || !scripts.includes(script)) {
                continue;
            }
        }

        if (countries && countries.length != 0) {
            const country = values[i].localization.country?.code;
            if (!country || !countries.includes(country)) {
                continue;
            }
        }

        return values[i].text;
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return Locale(values, _fallback.languages, _fallback.scripts, _fallback.countries, fallback);
        }
    }

    return undefined;
};
