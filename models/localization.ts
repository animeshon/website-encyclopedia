import languages from '@cospired/i18n-iso-languages';
import  countries from 'i18n-iso-countries';

export class Country {
    id: string;
    public code: string;
    public alpha2: string;

    constructor(rawData: any) {
        this.id = rawData.id;
        this.code = rawData.code;
        this.alpha2 = rawData.alpha2;
    }

    public HumanReadible(locale: string = "en"): string {
        if (this.alpha2 != undefined) {
            return countries.getName(this.alpha2, locale, {select: "official"});
        } else if (this.code != undefined) {
            return languages.getName(this.code, locale);
        }
        return "Unknown Country";
    }
}

export class Language {
    id: string;
    public code: string;
    public alpha2: string;
    public alpha3t: string;
    public alpha3b: string;

    // TODO Scripts

    constructor(rawData: any) {
        this.id = rawData.id;
        this.code = rawData.code;
        this.alpha2 = rawData.alpha2;
        this.alpha3t = rawData.alpha3t;
        this.alpha3b = rawData.alpha3b;
    }

    public HumanReadible(locale: string = "en"): string {
        if (this.alpha2 != undefined) {
            return languages.getName(this.alpha2, locale);
        } else if (this.code != undefined) {
            return languages.getName(this.code, locale);
        }
        return "Unknown Language";
    }
}

class Localization {
    name: string;
    tag: string;
    country: Country;
    language: Language;

    static FromRawData(rawData){
        return new Localization(rawData.name, rawData.tag, new Country(rawData.country ?? {}), new Language(rawData.language ?? {}))
    }

    constructor(name: string, tag: string, country: Country = new Country({}), language: Language = new Language({})) {
        this.name = name;
        this.tag = tag;
        this.country = country;
        this.language = language;
    }

    public GetResourceName(): string {
        return this.name;
    }

    public GetCountry(): Country {
        return this.country;
    }

    public GetLanguage(): Country {
        return this.language;
    }
}

export default Localization;