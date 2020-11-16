export const AgeRating = (values, countries, fallback = null, displayAge = true) => {
    if (!values || values.length == 0) {
        return undefined;
    }

    for (var i = 0; i < values.length; i++) {
        if (!values[i]) {
            continue;
        }

        if (countries && countries.length != 0) {
            const country = values[i].country?.code;
            if (!country || !countries.includes(country)) {
                continue;
            }
        }

        return displayAge ? `${values[i].tag} (${values[i].age}+)` : values[i].tag;
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return AgeRating(values, _fallback.countries, fallback, displayAge);
        }
    }

    return undefined;
};