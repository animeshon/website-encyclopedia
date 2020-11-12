export const fallbackRegular = [{types: ['REGULAR'], formats: ['PNG']}];
export const fallbackRegularAny = [{types: ['REGULAR'], formats: ['PNG']}, {types:['REGULAR']}, {}];

export const withImage = (images, types, formats, fallback = null) => {
    if (!images || images.length == 0) {
        return undefined;
    }

    for (var i = 0; i < images.length; i++) {
        if (!images[i]) {
            continue;
        }

        if (types && types.length != 0) {
            const type = images[i].type;
            if (!type || !types.includes(type)) {
                continue;
            }
        }

        if (!images[i].image || !images[i].image.files) {
            continue;
        }

        if (formats && formats.length != 0) {
            for (var j = 0; j < images[i].image.files.length; j++) {
                const format = images[i].image.files[j].format;
                if (!format || !formats.includes(format)) {
                    continue;
                }

                return images[i].image.files[j].publicUri;
            }

            continue;
        }

        return images[i].image.files[0].publicUri;
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return withImage(images, _fallback.types, _fallback.formats, fallback);
        }
    }

    return undefined;
};
