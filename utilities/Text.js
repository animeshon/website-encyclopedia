export const Truncate = (text, max) => {
    if (!text) { return undefined }
    return (text && text.length > max) ? text.substr(0, max - 1) + '…' : text;
};
