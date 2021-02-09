import * as season from '@/utilities/Season';

export const ByContent = (type, release, runnings) => {
    if (type == "VisualNovel") {
        return {season: false, premiere: PremiereAny(release, runnings)};
    }
    return {season: true, premiere: season.JapanAny(runnings)};
}

export const PremiereAny = (release, runnings) => {
    if (release) {
        const fromT = new Date(release);
        return fromT.toLocaleDateString('en-US');
    }

    return Premiere(runnings, ['JPN'], [{countries: ['USA']}, {}])
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
    
        return from.toLocaleDateString('en-US');
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