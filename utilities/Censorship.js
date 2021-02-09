export const Censorship = (degree) => {
    switch (degree) {
        case "UNKNOWN": {
            return { name: "Unknown" };
        }
        case "NONE": {
            return { name: "None" };
        }
        case "LITTLE": {
            return { name: "Little" };
        }
        case "MEDIUM": {
            return { name: "Medium" };
        }
        case "HEAVY": {
            return { name: "Heavy" };
        }
    }
    return { name: "Unknown" };
} 