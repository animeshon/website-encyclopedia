export const Subtype = (type, subtype) => {
    // TODO internationalization
    if (subtype === "OTHER") {
        return "Other";
    }
    if (subtype === "UNKNOWN") {
        return undefined;
    }
    switch (type) {
        case "Anime": {
            switch (subtype) {
                case "MOVIE":
                    return "Movie";
                case "MUSIC_VIDEO":
                    return "Music Video";
                case "ONA":
                    return "ONA";
                case "OVA":
                    return "OVA";
                case "SPECIAL":
                    return "Special";
                case "TV":
                    return "TV";
                case "WEB":
                    return "Web Anime";
            }
        }
        break;
        case "Manga": {
            switch (subtype) {
                case "MANGA":
                    return "Manga";
                case "MANHUA":
                    return "Manhua";
                case "MANHWA":
                    return "Manhwa";
                case "OEL":
                    return "Original English Language";
                case "ONE_SHOT":
                    return "One Shot";
            }
        }
        break;
        case "Doujinshi": {
            switch (subtype) {
                case "BOOTLEG":
                    return "Bootleg";
                case "CG":
                    return "Original";
                case "MANGA":
                    return "Manga";
                case "NOVEL":
                    return "Novel";
                case "SOFT":
                    return "Soft";
            }
        }
        break;
        
   }
   return undefined
};