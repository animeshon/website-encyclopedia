const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

export const EnglishDay = (date) => {
    return `${date.getDate() + 1}${nth(date.getDate() + 1)}`;
}

export const EnglishMonth = (date) => {
    return date.toLocaleString('en-US', { month: 'long' });
}

export const EnglishWeekDay = (date) => {
    return date.toLocaleString('en-US', { weekday: 'long' });
}

export const EnglishDateNoYear = (date) => {
    return `${EnglishWeekDay(date)}, ${EnglishDay(date)} ${EnglishMonth(date)}`;
}

export const FormatNoYear = (d) => {
    if (d == undefined) {
        return undefined;
    }

    return EnglishDateNoYear(from);
};

export const EnglishDate = (date) => {
    return date ? new Date(date).toLocaleDateString('en-US', {month: "short",  year: "numeric", day: "numeric"}) : undefined;
};