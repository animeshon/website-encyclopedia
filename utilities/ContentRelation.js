export const Type = (type) => {
    // TODO internationalization
   switch (type) {
    case "ADAPTATION":
        return "Adapted from";
    case "BASE":
        return "Adaptation";
    case "SAME_SETTING":
        return "Same Settings";
    case "ALTERNATIVE_SETTING":
        return "Alternative Settings";
    case "ALTERNATIVE_VERSION":
        return "Alternative Version";
    case "CHARACTER":
        return "Characters";
    case "FULL_STORY":
        return "Full Story";
    case "SUMMARY":
        return "Summary";
    case "PARENT_STORY":
        return "Parent Story";
    case "SPIN_OFF":
        return "Spin-Off";
    case "PREQUEL":
        return "Prequel";
    case "SEQUEL":
        return "Sequel";
    case "MAIN_STORY":
        return "Main Story";
    case "SIDE_STORY":
        return "Side Story";
    case "ORIGINAL":
        return "Original";
    case "PARODY":
        return "Parody";
   }
   return undefined;
}