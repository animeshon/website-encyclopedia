import trim from 'lodash/trim';
import split from 'lodash/split';

export const cleanSearch = string => {
    const splittedQuery = split(string, ' ');
    const removeSpaces = splittedQuery.filter(i => i != '');
    const joinTheWords = removeSpaces.join(' ');
    const q = joinTheWords;

    return q;
};
