export const Platform = (code) => {
    switch (code) {
        case "WINDOWS": {
            return { name: "Windows" };
        }
        case "DOS": {
            return { name: "Dos" };
        }
        case "LINUX": {
            return { name: "Linux" };
        }
        case "MAC": {
            return { name: "Macintosh" };
        }
        case "IOS": {
            return { name: "iOS" };
        }
        case "ANDROID": {
            return { name: "Android" };
        }
        case "DVD_PLAYER": {
            return { name: "DVD Player" };
        }
        case "BLU_RAY_PLAYER": {
            return { name: "Blue-Ray Player" };
        }
        case "FM_TOWNS": {
            return { name: "FM Towns" };
        }
        case "GAMEBOY_ADVANCE": {
            return { name: "GameBoy Advance" };
        }
        case "GAMEBOY_COLOR": {
            return { name: "GameBoy Color" };
        }
        case "NES": {
            return { name: "Nintendo Nes" };
        }
        case "PC88": {
            return { name: "PC 88" };
        }
        case "PC98": {
            return { name: "PC 93" };
        }
        case "PC_ENGINE": {
            return { name: "PC Engine" };
        }
        case "PC_FX": {
            return { name: "Pc-FX" };
        }
        case "PSP": {
            return { name: "PlayStation Portable" };
        }
        case "PS1": {
            return { name: "PlayeStation" };
        }
        case "PS2": {
            return { name: "PlayeStation2" };
        }
        case "PS3": {
            return { name: "PlayeStation3" };
        }
        case "PS4": {
            return { name: "PlayeStation4" };
        }
        case "PS_VITA": {
            return { name: "PlayeStation Vita" };
        }
        case "DGRAMCAST": {
            return { name: "Dramcast" };
        }
        case "SEGA_SATURN": {
            return { name: "Saga Saturn" };
        }
        case "SUPER_NINTENDO": {
            return { name: "Super Nintendo" };
        }
        case "NINTENDO_SWITCH": {
            return { name: "Nintendo Switch" };
        }
        case "NINTENDO_WII": {
            return { name: "Nintendo Wii" };
        }
        case "NINTENDO_WII_U": {
            return { name: "Nintendo Wii U" };
        }
        case "NINTENDO_3DS": {
            return { name: "Nintendo 3DS" };
        }
        case "X68000": {
            return { name: "X68000" };
        }
        case "XBOX_ONE": {
            return { name: "Xbox One" };
        }
        case "XBOX_360": {
            return { name: "Xbox 360" };
        }
        case "XBOX": {
            return { name: "Xbox" };
        }
        case "WEBSITE": {
            return { name: "Web Game" };
        }
        case "OTHER": {
            return { name: "Other" };
        }
    }
    return { name: "Unknown" };
} 