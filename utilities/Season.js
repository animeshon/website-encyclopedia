export const JapanAny = (runnings) => {
    return Season(runnings, ['JPN'], [{countries: ['USA']}, {}])
};

export const Season = (runnings, countries, fallback = null) => {
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
    
        // If there is no known end date of airing just return the starting date.
        let to = runnings[i].to ? (new Date(runnings[i].to)) : undefined;
        
        if (!to) {
            return `${from.getMonth() + 1}-${from.getFullYear()}\n???`;
        }

        // if from and to coincide, it means it's an oneshot content
        if (to.getFullYear() == 1) {
            // 0001 year (golang's zero date) hotfix
            to = from;
        }
    
        // Is it a seasonal anime? Verify by checking whether the release time is less or equal to 4 months.
        if ((from.getMonth()+from.getFullYear()*12) - (to.getMonth()+to.getFullYear()*12) <= 4 || from == to) {
            switch (from.getMonth()) {
                case 0:
                    return `Winter ${from.getFullYear() - 1}`;
                case 1:
                case 2:
                case 3:
                    return `Spring ${from.getFullYear()}`;
                case 4:
                case 5:
                case 6:
                    return `Summer ${from.getFullYear()}`;
                case 7:
                case 8:
                case 9:
                    return `Autumn ${from.getFullYear()}`;
                case 10:
                case 11:
                    return `Winter ${from.getFullYear()}`;
            }
        }

        // It probably is a non-seasonal anime. Return both starting and ending dates.
        return `${from.getMonth() + 1}-${from.getFullYear()}\n${to.getMonth() + 1}-${to.getFullYear()}`;
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return Season(runnings, _fallback.countries, fallback);
        }
    }

    return undefined;
};