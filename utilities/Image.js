export const fallbackRegular = [{ types: ['REGULAR'], formats: ['PNG'] }];
export const fallbackRegularAny = [{ types: ['REGULAR'], formats: ['PNG'] }, { types: ['REGULAR'] }, {}];

export const ProfileAny = (images, ratings = null) => {
    return Image(images, ['PROFILE'], ['PNG'], ratings, fallbackRegularAny);
};

export const Cover = (images, ratings = null) => {
    return Image(images, ['COVER'], ['PNG'], ratings);
};

export const All = (images, ratings = null) => {
    return images.map(i => Image(i, [], [], ratings, fallbackRegularAny));
}

// Returns an Image object
// { uri: url_to_image, ratings: rating_of_the_image}
export const Image = (images, types, formats, ratings = null, fallback = null) => {
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

                // we return an object {uri, ratings} in order to process the image later on
                // also we add the ratings of the "wrapper" content (anime, manga, ...) if any,
                // if the image do not has it own rating
                return {
                    uri: images[i].image.files[j].publicUri, 
                    ratings: images[i].ageRatings?.length ? images[i].ageRatings : ratings
                };
            }

            continue;
        }

        // Take the first image available, no matter the format or type.
        for (var j = 0; j < images.length; j++) {
            if (images[i].image.files[j]) {
                // we return an object {uri, ratings} in order to process the image later on
                // also we add the ratings of the "wrapper" content (anime, manga, ...) if any,
                // if the image do not has it own rating
                return {
                    uri: images[i].image.files[j].publicUri, 
                    ratings: images[i].ageRatings?.length ? images[i].ageRatings : ratings
                };
            }
        }
    }

    if (fallback) {
        fallback = [...fallback];

        const _fallback = fallback.shift();
        if (_fallback) {
            return Image(images, _fallback.types, _fallback.formats, ratings, fallback);
        }
    }

    return undefined;
};
