export const Role = (role) => {
    switch (role) {
        case "MAIN":
            return "Main Character";
        case "SUPPORT":
            return "Support Character";
        case "APPEARS":
            return "Appearance";
    }

    return undefined;
};
