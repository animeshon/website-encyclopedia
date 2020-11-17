export const Truncate = (text, max) => {
    return (text && text.length > max) ? text.substr(0, max - 1) + '…' : text;
};
