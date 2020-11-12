export const localizer = (i, languages, scripts) => {
    // if (i == undefined) {
    //     return undefined;
    // }

    return i.filter(o => {
        if (languages !== null) {
            const language = o.localization.language.code;
            if (!language || !languages.includes(language)) {
                return false;
            }
        }

        if (scripts !== null) {
            const script = o.localization.script.code;
            if (!script || !scripts.includes(script)) {
                return false;
            }
        }

        return true;
    })[0];
};
