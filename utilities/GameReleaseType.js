export const GameReleaseType = (type) => {
    switch (type) {
        case "UNKNOWN": {
            return { name: "Unknown" };
        }
        case "COMPLETE": {
            return { name: "Complete Release" };
        }
        case "DLC": {
            return { name: "Dlc Expansion" };
        }
        case "PARTIAL": {
            return { name: "Partial Release" };
        }
        case "TRIAL": {
            return { name: "Trial Version" };
        }
    }
    return { name: "Unknown" };
} 