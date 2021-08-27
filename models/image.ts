export enum Likelihood {
    UNKNOWN = "UNKNOWN",
    VERY_UNLIKELY = "VERY_UNLIKELY",
    UNLIKELY = "UNLIKELY",
    POSSIBLE = "POSSIBLE",
    LIKELY = "LIKELY",
    VERY_LIKELY = "VERY_LIKELY",
};

class Image {
    url: string;
    adultAnnotation: Likelihood;
    juvenileAnnotation: Likelihood;

    static FromRawData(raw: any): Image {
        const img = new Image(raw.url);
        if (raw.annotations?.safeSearch) {
            img.SetAdultAnnotation(raw.annotations.safeSearch.adult);
            img.SetJuvenileAnnotation(raw.annotations.safeSearch.juvenile);
        }
        return img;
    }

    constructor(url: string) {
        this.url = url;
        this.adultAnnotation = Likelihood.UNKNOWN;
        this.juvenileAnnotation = Likelihood.UNKNOWN;
    }

    public SetAdultAnnotation(likelihood: Likelihood) {
        this.adultAnnotation = likelihood;
    }

    public SetJuvenileAnnotation(likelihood: Likelihood) {
        this.juvenileAnnotation = likelihood;
    }

    public IsAdult(): boolean {
        return this.adultAnnotation == Likelihood.POSSIBLE
            || this.adultAnnotation == Likelihood.LIKELY
            || this.adultAnnotation == Likelihood.VERY_LIKELY;
    }

    public IsRestricted(): boolean {
        return this.IsAdult() && (this.juvenileAnnotation == Likelihood.POSSIBLE
            || this.juvenileAnnotation == Likelihood.LIKELY
            || this.juvenileAnnotation == Likelihood.VERY_LIKELY);
    }

    public GetURL(format: string, width: number, height: number): string {
        // console.log(`${this.url} ${format} ${width} ${height}`)
        // return `${this.url}=s${width > height ? width : height}-${format.toLocaleLowerCase()}`;
        return this.url;
    }
};

export default Image;