export const withPremiereAny = (release, runnings) => {
    // US English uses month-day-year order
    if (release !== undefined) {
        return new Date(release).toLocaleDateString('en-US')
    }
    return withPremiere(runnings, ['JPN'], [{countries: ['USA']}, {}])
};

export const withPremiere = (runnings, countries, fallback = null) => {
    if (!runnings) {
        return undefined;
    }

    for (var i = 0; i < runnings.length; i++) {
        if (!runnings[i] || !runnings[i].from) {
            continue;
        }

        const from = runnings[i].from ? (new Date(runnings[i].from)) : undefined;
        if (!from) {
            continue;
        }

        if (countries && countries.length != 0) {
            const country = runnings[i].localization?.country?.code;
            if (!country || !countries.includes(country)) {
                continue;
            }
        }
    
        // US English uses month-day-year order
        return new Date(runnings[i].from).toLocaleDateString('en-US')
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return withPremiere(runnings, _fallback.countries, fallback);
        }
    }

    return undefined;
};