export const langPickerSwitcher = arr =>
    arr.map(iso => {
        switch (iso) {
            case 'jp':
                return {
                    iso,
                    extended: 'Japanese',
                };
            case 'de':
                return {
                    iso,
                    extended: 'German',
                };
            case 'es':
                return {
                    iso,
                    extended: 'Spanish',
                };
            case 'us':
                return {
                    iso,
                    extended: 'English',
                };
            case 'fr':
                return {
                    iso,
                    extended: 'French',
                };
            case 'it':
                return {
                    iso,
                    extended: 'Italian',
                };
            case 'pt':
            case 'br':
                return {
                    iso,
                    extended: 'Portuguese',
                };
            case 'fi':
                return {
                    iso,
                    extended: 'Finnish',
                };
            case 'pl':
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
