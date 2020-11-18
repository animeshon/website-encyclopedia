import { SafeSearchImage } from '@/utilities/SafeSearch';

export const fallbackRegular = [{ types: ['REGULAR'], formats: ['PNG'] }];
export const fallbackRegularAny = [{ types: ['REGULAR'], formats: ['PNG'] }, { types: ['REGULAR'] }, {}];

export const ProfileAny = (images, isSafeSearch = true) => {
    return Image(images, ['PROFILE'], ['PNG'], isSafeSearch, fallbackRegularAny)
};

export const Cover = (images, isSafeSearch = true) => {
    return Image(images, ['COVER'], ['PNG'], isSafeSearch)
};

export const All = (images, isSafeSearch = true) => {
    return images.map(i => Image([i]), [], [], isSafeSearch, fallbackRegularAny)
}

export const Image = (images, types, formats, isSafeSearch = true, fallback = null) => {
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

                const image = images[i].image.files[j].publicUri;
                return SafeSearchImage(images[i].ageRatings, image, isSafeSearch);
            }

            continue;
        }

        // Take the first image available, no matter the format or type.
        for (var j = 0; j < images.length; j++) {
            if (images[i].image.files[j]) {
                const image = images[i].image.files[j].publicUri;
                return SafeSearchImage(images[i].ageRatings, image, isSafeSearch);
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
