export const fallbackRegular = [{ types: ['REGULAR'], formats: ['PNG'] }];
export const fallbackRegularAny = [{ types: ['REGULAR'], formats: ['PNG'] }, { types: ['REGULAR'] }, {}];

export const ProfileAny = (images, ratings = null) => {
    return Image(images, ['PROFILE'], ['PNG'], ratings, fallbackRegularAny);
};

export const Cover = (images, ratings = null) => {
    return Image(images, ['COVER'], ['PNG'], ratings);
};

export const All = (images, ratings = null) => {
    return images.map(i => Image([i], [], [], ratings, fallbackRegularAny));
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

        // Take the first image available, no matter the type.
        return {
            files: images[i].image.files, 
            ratings: images[i].ageRatings?.length ? images[i].ageRatings : ratings
        };
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
