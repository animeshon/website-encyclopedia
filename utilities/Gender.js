export const Gender = (role) => {
    switch (role) {
        case "MALE":
            return "Male";
        case "FEMALE":
            return "Female";
    }

    return undefined;
};