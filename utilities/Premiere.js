export const withPremiereAny = (release, runnings) => {
    if (release !== undefined) {
        const fromT = new Date(release);
        const nowT = new Date();

        // If title was released in the last 12 months show full date.
        if ((nowT.getMonth() + nowT.getFullYear()*12) - (fromT.getMonth() + fromT.getFullYear()*12) < 12) {
            return fromT.toLocaleDateString('en-US');
        }

        // Otherwise just show the year.
        return fromT.getFullYear();
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
    
        const fromT = new Date(from);
        const nowT = new Date();

        // If title was released in the last 12 months show full date.
        if ((nowT.getMonth() + nowT.getFullYear()*12) - (fromT.getMonth() + fromT.getFullYear()*12) < 12) {
            return fromT.toLocaleDateString('en-US');
        }

        // Otherwise just show the year.
        return fromT.getFullYear();
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