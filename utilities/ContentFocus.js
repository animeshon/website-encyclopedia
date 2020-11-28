export const Focus = (type) => {
    // TODO internationalization
    switch (type) {
        case "ANIME":
            return "Anime";
        case "GAME":
            return "Game";
        case "LIGHT_NOVEL":
            return "Light Novel";
        case "MANGA":
            return "manga";
        case "OTHER":
            return "Other";
    }
    return undefined
};