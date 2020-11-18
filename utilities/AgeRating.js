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

export const Age = (values) => {
    if (!values || values.length == 0) {
        return undefined;
    }

    var age = undefined;
    for (var i = 0; i < values.length; i++) {
        if (!values[i]) {
            continue;
        }

        var rating = values[i].age;
        if (rating == undefined && values[i].ageRatings) {
            rating = Age(values[i].ageRatings);
        }

        if (!rating) {
            continue;
        }

        if (age == undefined || rating > age) {
            age = rating;
        }
    }

    return age;
}

export const IsAdultOnly = (values) => {
    return Age(values) >= 17;
}


// Valid values are 'general', 'mature', 'restricted', 'adult', '14 years', and 'safe for kids'.

// We don't use 'safe for kids' because misslabeled content might get us banned from search engines
// for life and we really don't want that to happen.
export const WebMetaTag = (values) => {
    const age = Age(values);
    if (age == undefined || age < 13) {
        return 'general';
    }
    if (age <= 14) {
        return '14 years';
    }
    if (age <= 17) {
        return 'restricted';
    }
    
    return 'adult';
}