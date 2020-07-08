export const localizer = (arr, local) => {
    return arr.filter(o => {
        const id = o.localization[0].id;
        if (id) {
            return local.includes(id);
        }
    })[0];
};
