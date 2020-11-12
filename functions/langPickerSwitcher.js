export const langPickerSwitcher = arr =>
    arr.map(iso => {
        switch (iso) {
            case 'jpn':
                return {
                    iso,
                    extended: 'Japanese',
                };
            case 'deu':
                return {
                    iso,
                    extended: 'German',
                };
            case 'spa':
                return {
                    iso,
                    extended: 'Spanish',
                };
            case 'eng':
                return {
                    iso,
                    extended: 'English',
                };
            case 'fra':
                return {
                    iso,
                    extended: 'French',
                };
            case 'ita':
                return {
                    iso,
                    extended: 'Italian',
                };
            case 'por':
                return {
                    iso,
                    extended: 'Portuguese',
                };
            case 'fi':
                return {
                    iso,
                    extended: 'Finnish',
                };
            case 'pol':
                return {
                    iso,
                    extended: 'Polish',
                };
            case 'ro':
                return {
                    iso,
                    extended: 'Romanian',
                };
            default:
                break;
        }
    });
