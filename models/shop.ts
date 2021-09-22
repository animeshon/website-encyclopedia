import  countries from 'i18n-iso-countries';

const ASSET_PREFIX = process.env.NEXT_PUBLIC_ASSET_PREFIX || '';

class Shop {
    isGlobal: boolean;
    name: string;
    url: string;
    country: string;
    countryLabel: string;

    constructor(
        isGlobal: boolean,
        name: string,
        url: string,
        country: string) {
            this.country = country;
            this.name = name;
            this.url = url;
            this.isGlobal = isGlobal;
        }

        // TODO Move to translation files
        public Localize(locale: string = "en"): void {
            if (this.isGlobal) {
                this.countryLabel = "Global";
            } else {
                this.countryLabel = countries.getName(this.country, locale, {select: "official"});
            }
        }

        public GetCountry(): string {
            return this.country;
        }

        public GetImageURL(): string {
            return `${ASSET_PREFIX}/images/${this.name}.png`;
        }

        public GetURL(): string {
            return this.url;
        }

        public GetName(): string {
            return this.name;
        }

        public GetCountryLabel(): string {
            return this.countryLabel;
        }
}

export default Shop;