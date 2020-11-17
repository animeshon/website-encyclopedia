export const fallbackRegular = [{ types: ['REGULAR'], formats: ['PNG'] }];
export const fallbackRegularAny = [{ types: ['REGULAR'], formats: ['PNG'] }, { types: ['REGULAR'] }, {}];

export const ProfileAny = (images) => {
    return Image(images, ['PROFILE'], ['PNG'], fallbackRegularAny)
};

export const Cover = (images) => {
    return Image(images, ['COVER'], ['PNG'])
};

export const All = (images) => {
    return images.map(i => Image([i]), [], [], fallbackRegularAny)
}

export const Image = (images, types, formats, fallback = null) => {
    if (!images || images.length == 0) {
        return undefined;
    }

    for (var i = 0; i < images.length; i++) {
        if (!images[i] || !images[i].image || !images[i].image.files) {
            continue;
        }

        if (types && types.length != 0) {
            const type = images[i].type;
            if (!type || !types.includes(type)) {
                continue;
            }
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

        // Take the first image available, no matter the format or type.
        for (var j = 0; j < images.length; j++) {
            if (images[i].image.files[j]) {
                return images[i].image.files[j].publicUri;
            }
        }
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return Image(images, _fallback.types, _fallback.formats, fallback);
        }
    }

    return undefined;
};
