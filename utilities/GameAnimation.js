export const GameAnimation = (degree) => {
    switch (degree) {
        case "UNKNOWN": {
            return { name: "Unknown" };
        }
        case "NONE": {
            return { name: "No Animation" };
        }
        case "SIMPLE": {
            return { name: "Simple Animation" };
        }
        case "PARTIAL": {
            return { name: "Partially Animated" };
        }
        case "FULL": {
            return { name: "Fully Animated" };
        }
    }
    return { name: "Unknown" };
} 