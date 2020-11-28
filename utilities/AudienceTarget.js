export const Target = (type) => {
    // TODO internationalization
    switch (type) {
        case "SEINEN":
            return "Seinen";
        case "SHOUJOU":
            return "Shojo";
        case "SHOUNEN":
            return "Shonen";
    }
    return undefined
};