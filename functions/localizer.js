export const localizer = (i, languages, scripts) => {
    // if (i == undefined) {
    //     return undefined;
    // }

    return i.filter(o => {
        const language = o.localization.language.code;
        if (!language || !languages.includes(language)) {
            return false;
        }

        const script = o.localization.script.code;
        if (script) {
            return scripts.includes(script);
        }
    })[0];
};
