export const Role = (type) => {
    // TODO internationalization
   switch (type) {
    case "ART_DIRECTION":
        return "Art Direction";
    case "AUTHOR":
        return "Author";
    case "CHARACTER_DESIGN":
        return "Character Design";
    case "DIRECTION":
        return "Direction";
    case "ILLUSTRATION":
        return "Illustration";
    case "LYRICS":
        return "Lyrics";
    case "MUSIC_ARRANGEMENT":
        return "Music Arrangement";
    case "MUSIC_COMPOSITION":
        return "Music Composition";
    case "PRODUCTION":
        return "Production";
    case "PUBLISHING":
        return "Publishing";
    case "SCRIPT":
        return "Scripts";
    case "SERIALIZATION":
        return "Serialization";
    case "STORY":
        return "Story";
    case "STUDIO":
        return "Studios";
    case "VOCALIST":
        return "Vocalist";
   }
   return undefined
};
