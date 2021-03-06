export const Type = (type) => {
    // TODO internationalization
   switch (type) {
        case "Anime":
            return "Anime";
        case "Manga":
            return "Manga";
        case "Doujinshi":
            return "Doujinshi";
        case "LightNovel":
            return "Light Novel";
        case "VisualNovel":
            return "Visual Novel";
        case "Song":
            return "Track";
        case "Episode":
            return "Episode";
        case "Chapter":
            return "Chapter";
        case "Universe":
            return "Universe";
        case "Canonical":
            return "Canonical Franchise";
        case "Volume":
            return "Volume";
        case "Episode":
            return "Episode";
        case "MusicCollection":
            return "Music Record";
        case "Character":
            return "Character";
        case "Organization":
            return "Organization";
        case "Magazine":
            return "Magazine";
        case "Circle":
            return "Circle";
        case "Convention":
            return "Convention";
        case "Person":
            return "Person";
        case "VoiceOver":
            return "Voice Over";
   }
   return undefined
};
