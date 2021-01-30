
export const DeleteUndefined = (obj) => {
    if (obj) {
        Object.keys(obj).forEach((key) => {
            if (obj[key] && typeof obj[key] === 'object') {
                DeleteUndefined(obj[key]);
            } else if (typeof obj[key] === 'undefined') {
                delete obj[key]; // eslint-disable-line no-param-reassign
            }
        });
    }
    return obj;
};