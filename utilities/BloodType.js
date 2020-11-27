export const BloodType = (type) => {
    switch (type) {
        case "A":
            return "A";
        case "A_MINUS":
            return "A-";
        case "A_PLUS":
            return "A+";
        case "AB":
            return "AB";
        case "AB_MINUS":
            return "AB-";
        case "AB_PLUS":
            return "AB+";
        case "B":
            return "B";
        case "B_MINUS":
            return "B-";
        case "B_PLUS":
            return "B+";
        case "O":
            return "O";
        case "O_MINUS":
            return "O-";
        case "O_PLUS":
            return "O+";
    }

    return undefined;
};