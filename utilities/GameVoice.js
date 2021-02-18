export const GameVoice = (degree) => {
    switch (degree) {
        case "UNKNOWN": {
            return { name: "Unknown" };
        }
        case "NONE": {
            return { name: "Not Voiced" };
        }
        case "ERO_ONLY": {
            return { name: "Only Erotic" };
        }
        case "PARTIAL": {
            return { name: "Partially Voiced" };
        }
        case "FULL": {
            return { name: "Fully Voiced" };
        }
    }
    return { name: "Unknown" };
} 