export const Length = (type) => {
    // TODO internationalization
   switch (type) {
        case "VERY_SHORT":
            return "< 2 hours";
        case "SHORT":
            return "2 - 10 hours";
        case "MEDIUM":
            return "10 - 30 hours";
        case "LONG":
            return "30 - 50 hours";
        case "VERY_LONG":
            return "> 50 hours";
   }
   return undefined
};
