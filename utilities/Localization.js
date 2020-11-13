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

export const withLatinLocaleAny = (values) => {
    return withLocale(values, [], ['Latn'], [], fallbackScriptAny)
};

export const withJapaneseLocale = (values) => {
    return withLocale(values, ['jpn'], ['Jpan'])
};

export const withRomajiLocale = (values) => {
    return withLocale(values, ['jpn'], ['Latn'])
};

export const withEnglishLocale = (values) => {
    return withLocale(values, ['eng'], ['Latn'])
};

export const withJapaneseLocaleAny = (values) => {
    return withLocale(values, ['jpn'], ['Jpan'], [], fallbackLatinAny)
};

export const withEnglishLocaleAny = (values) => {
    return withLocale(values, ['eng'], ['Latn'], [], fallbackLatinAny)
};

export const withLocale = (values, languages = [], scripts = [], countries = [], fallback = null) => {
    if (!values || values.length == 0) {
        return undefined;
    }

    for (var i = 0; i < values.length; i++) {
        if (!values[i].localization && (languages || scripts || countries)) {
            continue;
        }
        
        if (languages && languages.length != 0) {
            const language = values[i].localization.language?.code;
            if (!language || !languages.includes(language)) {
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
            return withLocale(values, _fallback.languages, _fallback.scripts, _fallback.countries, fallback);
        }
    }

    return undefined;
};
