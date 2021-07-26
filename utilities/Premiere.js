export const PremiereAny = (release, runnings) => {
    if (release) {
        return new Date(release);
    }

    return Premiere(runnings, ['JPN'], [{ countries: ['USA'] }, {}])
};

export const Premiere = (runnings, countries, fallback = null) => {
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

        return from;
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return Premiere(runnings, _fallback.countries, fallback);
        }
    }

    return undefined;
};

export const RunningJapanAny = (runnings) => {
    return Running(runnings, ['JPN'], [{ countries: ['USA'] }, {}])
};

export const Running = (runnings, countries, fallback = null) => {
    if (!runnings) {
        return {from: undefined, to: undefined};
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

        // If there is no known end date of airing just return the starting date.
        let to = runnings[i].to ? (new Date(runnings[i].to)) : undefined;

        if (!to) {
            return { from: undefined, to: undefined };
        }

        // if from and to coincide, it means it's an oneshot content
        if (to.getFullYear() == 1) {
            // 0001 year (golang's zero date) hotfix
            to = from;
        }

        // It probably is a non-Runningal anime. Return both starting and ending dates.
        return { from, to };
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return Running(runnings, _fallback.countries, fallback);
        }
    }

    return { from: undefined, to: undefined };
};
