
import { Locale, Japanese, Romaji, LatinAny } from '@/utilities/Localization';
import { Truncate } from '@/utilities/Text';
import { PremiereAny, RunningJapanAny } from '@/utilities/Premiere';
import { EnglishDate, EnglishMonth } from '@/utilities/Time';
import { IsAdultOnly } from '@/utilities/Restriction';
import languages from '@cospired/i18n-iso-languages';
import * as uri from '@/utilities/URI';
import Shop from '@/models/shop';
import { Language } from './localization';

export interface LocalizedEnum {
    value: string;
    label: string;
}

export class EntityNames {
    localizedName: string;
    originalName: string;
    transcriptedName: string;
    latinName: string;

    constructor(ln: string, on: string, tn: string, latnn: string) {
        this.localizedName = ln;
        this.originalName = on;
        this.transcriptedName = tn;
        this.latinName = latnn;
    }

    public Get(): string {
        if (this.localizedName != undefined) {
            return this.localizedName;
        }
        if (this.originalName != undefined) {
            return this.originalName;
        }
        if (this.transcriptedName != undefined) {
            return this.transcriptedName;
        }
        if (this.latinName != undefined) {
            return this.latinName;
        }
        return undefined;
    }

    public GetLocalized(): string {
        return this.localizedName
    }
    public GetOriginal(): string {
        return this.originalName
    }
    public GetTranscripted(): string {
        return this.transcriptedName
    }
    public GetLatin(): string {
        return this.latinName
    }
}

class Entity {
    // raw data coming from datasource
    protected rawData: any;

    protected type: string;
    protected subtype: string;

    protected description: string;
    protected names: EntityNames;

    protected premiere: Date;
    protected end: Date;

    protected isAdultOnly: boolean;

    protected gender: string;
    protected bloodType: string;

    protected languages: Language[];
    protected shops: any[];

    constructor(rawData: any) {
        this.rawData = rawData;

        this.type = rawData.entityType?.toLowerCase();
        this.isAdultOnly = IsAdultOnly(this.rawData.maturityRating);

        // Gender
        if (this.rawData.personGender != undefined) {
            this.gender = this.rawData.personGender;
        } else if (this.rawData.characterGender != undefined) {
            this.gender = this.rawData.characterGender;
        }

        // Blood type
        if (this.rawData.characterBloodType != undefined) {
            this.bloodType = this.rawData.characterBloodType;
        } else if (this.rawData.personBloodType != undefined) {
            this.bloodType = this.rawData.personBloodType;
        }

        // languages
        if (this.rawData.personLanguages != undefined) {
            this.languages = this.rawData.personLanguages.map(l => new Language(l));
        } else if (this.rawData.releaseLanguage != undefined) {
            this.languages = this.rawData.releaseLanguage.map(l => new Language(l));
        }

        // shops
        if (this.rawData.reelaseShops != undefined) {
            this.shops = this.rawData.reelaseShops;
        } else if (this.rawData.releasableShops != undefined) {
            this.shops = this.rawData.releasableShops;
        }

        this.setSubtype();
        this.setDates();
    }

    private setSubtype(): void {
        if (this.rawData.organizationType != undefined) {
            this.subtype = this.rawData.organizationType;
        } else if (this.rawData.gameReleaseType != undefined) {
            this.subtype = this.rawData.gameReleaseType;
        } else if (this.rawData.graphicNovelType != undefined) {
            this.subtype = this.rawData.graphicNovelType;
        } else if (this.rawData.animeType != undefined) {
            this.subtype = this.rawData.animeType;
        }
    }

    private setDates(): void {
        // Get the premiere date
        this.premiere = PremiereAny(this.rawData.releaseDate, this.rawData.runnings);
        const { to } = RunningJapanAny(this.rawData.runnings);
        this.end = to;
    }

    public Type(): string {
        return this.type;
    }

    public Subtype(): string {
        return this.subtype;
    }

    public Premiere(): Date {
        return this.premiere;
    }

    public GetID(): string {
        return this.rawData.id;
    }

    public GetURI(subpath: string = null, absolute: boolean = false): string {
        const u = uri.Rewrite(this.GetNames().Get(), this.GetID(), subpath);
        if (absolute) {
            return uri.AbsoluteURI(u);
        }
        return u;
    }

    public GetCanonicalURI(subpath: string): string {
        if (subpath.length != 0) {
            return uri.AbsoluteURI(`/${this.GetID()}/${subpath}`);
        }
        return uri.AbsoluteURI(`/${this.GetID()}`);
    }

    public Localize(locale: string = "eng"): void {
        this.names = new EntityNames(
            // If character, organization or person  and we are not localizing the website in japanese => the localized name is latin
            ["character", "organization", "person"].includes(this.type) && locale != "jpn" ? LatinAny(this.rawData.names) : Locale(this.rawData.names?.hits, [locale]),
            Japanese(this.rawData.names),
            Romaji(this.rawData.names),
            LatinAny(this.rawData.names),
        )

        this.description = Locale(this.rawData.descriptions?.hits, [locale]);
    }

    public GetCoverUrl(): string {
        return undefined
    }

    public GetBannerUrl(): string {
        return undefined
    }

    public GetNames(): EntityNames {
        return this.names;
    }

    public GetDescription(maxLength: number = 0): string {
        if (maxLength != 0) {
            return Truncate(this.description ?? "", maxLength);
        }
        return this.description ?? "";
    }

    public GetReleaseDate(): string | undefined {
        return EnglishDate(this.premiere);
    }

    public GetSeason(): string | undefined {
        if (this.premiere == undefined) {
            return undefined;
        }

        if (!["anime"].includes(this.type)) {
            return undefined
        }

        const timeSincePremiere = Math.floor((Date.now() - this.premiere.getTime()) / 1000);
        let end = this.end;
        if (end == undefined) {
            // if no end, ongoing and more than 5 months, then is not seasonal
            if (this.rawData.status == "ONGOING" && timeSincePremiere > 2592000 * 9) {
                return undefined;
            }
            // oneshot
            end = this.premiere;
        }

        // if from and to coincide, it means it's an oneshot content
        if (end.getFullYear() == 1) {
            // 0001 year (golang's zero date) hotfix
            end = this.premiere;
        }

        if ((end.getMonth() + end.getFullYear() * 12) - (this.premiere.getMonth() + this.premiere.getFullYear() * 12) <= 8 || this.premiere == end) {
            switch (this.premiere.getMonth()) {
                case 0:
                    return `Winter ${this.premiere.getFullYear() - 1}`;
                case 1:
                case 2:
                case 3:
                    return `Spring ${this.premiere.getFullYear()}`;
                case 4:
                case 5:
                case 6:
                    return `Summer ${this.premiere.getFullYear()}`;
                case 7:
                case 8:
                case 9:
                    return `Autumn ${this.premiere.getFullYear()}`;
                case 10:
                case 11:
                    return `Winter ${this.premiere.getFullYear()}`;
            }
        }

        // It probably is a non-seasonal anime. Return undefined
        return undefined;
    }

    public GetRunning(): string | undefined {
        if (this.premiere == undefined || this.end == undefined) {
            return undefined
        }
        return `${EnglishDate(this.premiere)} - ${EnglishDate(this.end)}`;
    }

    public GetBirthday(): string | undefined {
        if (this.rawData.personBirthDay != undefined) {
            return EnglishDate(this.rawData.personBirthDay);
        } else if (this.rawData.characterBirthDay) {
            const tokens = this.rawData.characterBirthDay.split(".");
            return `${EnglishMonth(tokens[0])} ${tokens[1]}`;
        }
        return undefined;
    }

    public GetFoundation(): string | undefined {
        if (this.rawData.foundation == undefined) {
            return undefined;
        }

        return EnglishDate(this.rawData.foundation.foundation);
    }

    public Independent(): boolean {
        return this.rawData.publishingType && this.rawData.publishingType == "SELF" || false;
    }

    public IsOriginal(): boolean {
        return this.rawData.original ?? false;
    }

    public IsContent(): boolean {
        return ["anime", "graphicnovel", "lightnovel", "visualnovel"].includes(this.type);
    }

    public IsAdultOnly(): boolean {
        return this.isAdultOnly;
    }

    public IsIllegal(country: string = ""): boolean {
        return this.rawData.regionRestrictions?.filter(r => { return r.tag == "MINOR-R18" }).length >= 1;
    }

    public GetShops(locale: string = "en"): Shop[] {
        return this.shops.map(s => {
            const shop = new Shop(
                s.isGlobal,
                s.name,
                s.url,
                s.country ? s.country.code : "",
            );
            shop.Localize(locale);
            return shop;
        });
    }

    // TODO Move to translation files
    private static typeMap = new Map<string, string>([
        ["anime", "Anime"],
        ["graphicnovel", "Graphic Novel"],
        ["lightnovel", "Light Novel"],
        ["visualnovel", "Visual Novel"],
        ["track", "Music Track"],
        ["episode", "Episode"],
        ["chapter", "Chapter"],
        ["universe", "Universe"],
        ["canonical", "Canonical Franchise"],
        ["volume", "Volume"],
        ["episode", "Episode"],
        ["musicrelease", "Music Release"],
        ["character", "Character"],
        ["organization", "Organization"],
        ["magazine", "magazine"],
        ["convention", "Convention"],
        ["person", "Person"],
        ["voiceover", "Voice Over"],
        ["gamerelease", "Game Release"],
    ]);
    public static LocalizeType(type: string, locale: string = ""): string | undefined {
        if (type == undefined) {
            return undefined
        }
        if (!Entity.typeMap.has(type)) {
            throw new Error(`unknown entity type: '${type}'`);
        }
        return Entity.typeMap.get(type);
    }
    public GetType(locale: string = ""): string | undefined {
        return Entity.LocalizeType(this.type, locale);
    }

    // TODO Move to translation files
    private static subtypeMap = new Map<string, Map<string, string>>([
        ["anime", new Map<string, string>([
            ["MOVIE", "Movie"],
            ["MUSIC_VIDEO", "Music Video"],
            ["ONA", "ONA"],
            ["OVA", "OVA"],
            ["SPECIAL", "Special"],
            ["TV", "TV Series"],
            ["WEB", "Web Anime"],
        ])],
        ["graphicnovel", new Map<string, string>([
            ["MANGA", "Manga"],
            ["MANHUA", "Manhua"],
            ["MANHWA", "Manhwa"],
            ["OVA", "OVA"],
            ["SPECIAL", "Special"],
            ["OEL", "Original English Language"],
            ["ONE_SHOT", "One Shot"],
            ["WEB_COMIC", "Web Comic"],
            ["YON_KOMA", "4 Koma"],
        ])],
        ["gamerelease", new Map<string, string>([
            ["COMPLETE", "Complete Release"],
            ["DLC", "Dlc Expansion"],
            ["PARTIAL", "Partial Release"],
            ["TRIAL", "Trial Version"],
        ])],
        ["organization", new Map<string, string>([
            ["CIRCLE", "Circle"],
            ["CORPORATE", "Corporation"],
        ])],
    ])
    public static LocalizeSubtype(type: string, subtype: string, locale: string = ""): string | undefined {
        if (subtype == undefined) {
            return undefined
        }

        if (subtype === "OTHER") {
            // Return undefined since the "other" information is not something we care about
            // and we will use the type instead
            // return "Other";
            return undefined;
        }
        if (subtype === "UNKNOWN") {
            return undefined;
        }

        const typeEntry = Entity.subtypeMap.get(type);
        if (typeEntry == undefined) {
            return undefined;
        }

        const subtypeEntry = typeEntry.get(subtype);
        if (undefined == subtypeEntry) {
            throw new Error(`unknown entity subtype type: '${subtype}' for type '${type}'`);
        }

        return subtypeEntry;
    }

    public GetSubtype(locale: string = ""): string | undefined {
        return Entity.LocalizeSubtype(this.type, this.subtype, locale);
    }

    // TODO Move to translation files
    private static statusMap = new Map<string, string>([
        ["CANCELED", "Canceled"],
        ["COMPLETED", "Completed"],
        ["INTERRUPTED", "Interrupted"],
        ["ONGOING", "Ongoing"],
        ["SCHEDULED", "Scheduled"],
        ["SUSPENDED", "Suspended"],
        ["WORK_IN_PROGRESS", "Work In Progress"],
    ]);
    public GetStatus(locale: string = ""): string | undefined {
        if (this.rawData.status == undefined) {
            return undefined
        }
        if (!Entity.statusMap.has(this.rawData.status)) {
            throw new Error(`unknown status: '${this.rawData.status}'`);
        }
        return Entity.statusMap.get(this.rawData.status);
    }

    // TODO Move to translation files
    private static genderMap = new Map<string, string>([
        ["UNDEFINED", "Undefined"],
        ["OTHER", "Other"],
        ["FEMALE", "Female"],
        ["FEMALE_TRAP", "Female Trap"],
        ["HERMAPHRODITIC", "Hermaphroditic"],
        ["INTERSEXUAL", "Intersexual"],
        ["MALE", "Male"],
        ["MALE_TRAP", "Male Trap"],
    ]);
    public static LocalizeGender(gender: string, locale: string = ""): string | undefined {
        if (gender == undefined || gender == "UNKNOWN") {
            return undefined
        }
        if (!Entity.genderMap.has(gender)) {
            throw new Error(`unknown entity gender: '${gender}'`);
        }
        return Entity.genderMap.get(gender);
    }

    public GetGender(locale: string = ""): string | undefined {
        return Entity.LocalizeGender(this.gender, locale);
    }

    // TODO Move to translation files
    private static bloodTypeMap = new Map<string, string>([
        ["A", "A"],
        ["A_MINUS", "A-"],
        ["A_PLUS", "A+"],
        ["AB", "AB"],
        ["AB_MINUS", "AB-"],
        ["AB_PLUS", "AB+"],
        ["B", "B"],
        ["B_MINUS", "B-"],
        ["B_PLUS", "B+"],
        ["O", "0"],
        ["O_MINUS", "0-"],
        ["O_PLUS", "0+"],
    ]);
    public static LocalizeBloodType(bloodtype: string, locale: string = ""): string | undefined {
        if (bloodtype == undefined) {
            return undefined
        }
        if (!Entity.bloodTypeMap.has(bloodtype)) {
            throw new Error(`unknown entity blood type: '${bloodtype}'`);
        }
        return Entity.bloodTypeMap.get(bloodtype);
    }

    public GetBloodType(locale: string = ""): string | undefined {
        return Entity.LocalizeBloodType(this.bloodType, locale);
    }

    public GetFullTypeString(locale: string = ""): string {
        return this.GetSubtype(locale) ? `${this.GetType(locale)} - ${this.GetSubtype(locale)}` : this.GetType(locale);
    }

    public GetEpisodeCount(): number | undefined {
        if (this.rawData.animeEpisodeCount) {
            return this.rawData.animeEpisodeCount;
        }
        if (this.rawData.animeEpisodeAggregate?.count) {
            return this.rawData.animeEpisodeAggregate.count;
        }
        return undefined;
    }

    public GetChaptersCount(): number | undefined {
        if (this.rawData.graphicNovelChapterCount) {
            return this.rawData.graphicNovelChapterCount;
        }
        if (this.rawData.lightNovelChapterCount) {
            return this.rawData.lightNovelChapterCount;
        }
        if (this.rawData.graphicNovelChapterAggregate?.count) {
            return this.rawData.graphicNovelChapterAggregate.count;
        }
        if (this.rawData.animeEpisodeAggregate?.count) {
            return this.rawData.animeEpisodeAggregate.count;
        }
    }

    public Languages(): Language[] {
        return this.languages
    }

    public LocalizedLanguages(locale: string = "en"): LocalizedEnum[] {
        if (this.languages == undefined) {
            return undefined;
        }
        return this.languages.map(l => { return { value: l.code, label: languages.getName(l.code, locale) } });
    }

    public NotUndefinedOrEmpty(value: any): boolean {
        if (undefined == value) {
            return false;
        }
        if ("" == value) {
            return false;
        }
        const n = parseInt(value);
        if (n == NaN) {
            return true;
        }
        if (n == 0) {
            return false;
        }
        return true;
    }
}

export default Entity