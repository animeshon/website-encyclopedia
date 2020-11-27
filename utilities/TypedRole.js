export const Role = (type) => {
    // TODO internationalization
   switch (type) {
    case "AUTHOR":
        return "Author";
    case "BROADCAST":
        return "Broadcaster";
    case "CHARACTER_DESIGN":
        return "Character Design";
    case "DIRECTION":
        return "Direction";
    case "GAME_DEVELOPMENT":
        return "Game Development";
    case "ILLUSTRATION":
        return "Illustration";
    case "LICENSING":
        return "Licensing";
    case "LYRICS":
        return "Lyrics";
    case "MUSIC_ARRANGEMENT":
        return "Music Arrangement";
    case "MUSIC_COMPOSITION":
        return "Music Composition";
    case "PRODUCTION":
        return "Music Production";
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
    case "VOCAL":
        return "Vocalist";
   }
   return undefined
};
