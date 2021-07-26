import Entity from "@/models/entity";
import { Restrictions, MaturityRating } from '@/utilities/Restriction';
import { FormatNoYear } from '@/utilities/Time';
import { Role } from '@/utilities/TypedRole';

interface CollaboratorsInfo {
    key: string;
    value: any[];
}

class SummaryDataModel extends Entity {

    collaborators: Map<string, Entity[]>;

    constructor(rawData: any) {
        super(rawData);

        this.collaborators = new Map<string, Entity[]>();
    }

    public Details(locale: string = "eng"): any {
        let name = this.names.GetLocalized();

        const externalSources = this.GetExternalSources();
        const collaborations = this.GetCollaborators(locale);

        return [
            [
                { key: 'Name', value: name },
                { key: 'Original', value: this.names.GetOriginal() },
                { key: 'Romaji', value: this.names.GetTranscripted() },
                { key: 'Languages', value: this.Languages() },
            ],
            [
                { key: 'Media', value: this.GetFullTypeString() },
                { key: 'Status', value: this.GetStatus() },
                this.GetRunning() != undefined ?
                    { key: 'Running', value: this.GetRunning() } :
                    { key: 'Released', value: this.GetReleaseDate() },
                { key: 'Season', value: this.GetSeason() },
                { key: 'Birthday', value: this.GetBirthday() },
                { key: 'Foundation', value: this.GetFoundation() },
                // TODO Move to translation files
                { key: 'Audience Target', value: this.GetAudienceTarget() },
                { key: 'Content Focus', value: this.GetContentFocus() },
                { key: 'Gender', value: this.GetGender() },
                { key: 'Blood Type', value: this.GetBloodType() },
                { key: 'Length', value: this.GetGameLength() },
            ],
            [
                { key: 'Is Original', value: this.IsContent() ? this.IsOriginal() ? "Yes" : "No" : undefined },
                { key: 'Is Self Published', value: this.IsContent() ? this.Independent() ? "Yes" : "No" : undefined },
                { key: 'Is Freeware', value: this.rawData.isFree != undefined ? this.rawData.isFree ? "Yes" : "No" : undefined },
            ],
            [
                { key: 'EAN10', value: this.NotUndefinedOrEmpty(this.rawData.ean10) ? this.rawData.ean10 : undefined },
                { key: 'EAN13', value: this.NotUndefinedOrEmpty(this.rawData.ean13) ? this.rawData.ean13 : undefined },
                { key: 'SKU', value: this.NotUndefinedOrEmpty(this.rawData.ean10) ? this.rawData.sku : undefined },
                { key: 'UPCE', value: this.NotUndefinedOrEmpty(this.rawData.ean10) ? this.rawData.upce : undefined },
                { key: 'UPCA', value: this.NotUndefinedOrEmpty(this.rawData.ean10) ? this.rawData.upca : undefined },
            ],
            [
                { key: 'Age Maturity', value: MaturityRating(this.rawData.maturityRatings, ['USA']), flag: 'us' },
                { key: 'Restriction', value: Restrictions(this.rawData.regionRestrictions).map(r => { return { text: r }; }) },
                { key: 'Censorship', value: this.GetCensorship() },
            ],
            externalSources.length != 0 ? [{ key: 'Source', value: externalSources }] : undefined,
            collaborations.length != 0 ? collaborations : undefined,
        ]
    }

    public GetExternalSources(): any[] {
        const crossrefs = (this.rawData.crossrefs || []).map(i => {
            const m = {
                "vndb-org": "VNDB",
                "anidb-net": "AniDB",
                "animenewsnetwork-com": "Anime News Network",
                "mangaupdates-com": "Baka-Updates Manga",
                "myanimelist-net": "My Anime List",
                "doujinshi-org": "The Doujinshi & Manga Lexicon",
            }
            return {
                text: m[i.namespace],
                href: i.website?.formattedAddress,
                external: true,
            }
        });
        return crossrefs;
    }

    public GetConventionYear(): string | undefined {
        if (this.rawData.from == undefined) {
            return undefined;
        }
        return `${(new Date(this.rawData.from.from)).getFullYear()}`;
    }

    public GetConventionPeriodNoYear(): string | undefined {
        if (this.rawData.from == undefined) {
            return undefined;
        }
        if (this.rawData.to == undefined) {
            return FormatNoYear(new Date(this.rawData.from));
        }
        return `${FormatNoYear(new Date(this.rawData.from))} - ${FormatNoYear(new Date(this.rawData.to))}`;
    }

    public SetCollaborators(collaborations: any): void {
        collaborations.forEach(v => {
            if (!this.collaborators.has(v.role.type)) {
                this.collaborators.set(v.role.type, [new Entity(v.collaborator)]);
            } else {
                this.collaborators.set(v.role.type, this.collaborators.get(v.role.type).concat(new Entity(v.collaborator)));
            }

        });
    }

    public GetCollaborators(locale: string = ""): CollaboratorsInfo[] {
        let coll: CollaboratorsInfo[] = [];
        this.collaborators.forEach((value, key, map) => {
            coll.push({
                key: Role(key),
                value: value.map(p => {
                    p.Localize(locale);
                    return {
                        text: p.GetNames().Get(),
                        href: p.GetURI()
                    }
                })
            })
        });
        coll.sort((a, b) => {
            return a.key < b.key ? -1 : 1;
        });
        return coll;
    }

    // TODO Character Guise of
    // { key: 'Guise of', value: guiseOf != undefined ? uri.Rewrite(guiseOf.type, guiseOf.names, guiseOf.id) : undefined },

    // TODO Move to translation files
    private static audienceMap = new Map<string, string>([
        ["SEINEN", "Seinen"],
        ["SHOUJOU", "Shojo"],
        ["SHOUNEN", "Shonen"],

    ])
    public GetAudienceTarget(locale: string = ""): string | undefined {
        if (this.rawData.audienceTarget == undefined) {
            return undefined
        }
        if (!SummaryDataModel.audienceMap.has(this.rawData.audienceTarget)) {
            throw new Error(`unknown audience target type: '${this.rawData.audienceTarget}'`);
        }
        return SummaryDataModel.audienceMap.get(this.rawData.audienceTarget);
    }

    // TODO Move to translation files
    private static contentFocusMap = new Map<string, string>([
        ["ANIME", "Anime"],
        ["GAME", "Game"],
        ["LIGHT_NOVEL", "Light Novel"],
        ["MANGA", "Graphic Novel"],
        ["OTHER", "Other"],

    ])
    public GetContentFocus(locale: string = ""): string | undefined {
        if (this.rawData.contentFocus == undefined || this.rawData.contentFocus == "UNKNOWN") {
            return undefined
        }
        if (!SummaryDataModel.contentFocusMap.has(this.rawData.contentFocus)) {
            throw new Error(`unknown audience target type: '${this.rawData.contentFocus}'`);
        }
        return SummaryDataModel.contentFocusMap.get(this.rawData.contentFocus);
    }

    // TODO Move to translation files
    private static censorshipMap = new Map<string, string>([
        ["NONE", "None"],
        ["LITTLE", "Little"],
        ["MEDIUM", "Medium"],
        ["HEAVY", "Heavy"],
    ])
    public GetCensorship(locale: string = ""): string | undefined {
        if (this.rawData.censorship == undefined || this.rawData.censorship == "UNKNOWN") {
            return undefined
        }
        if (!SummaryDataModel.censorshipMap.has(this.rawData.censorship)) {
            throw new Error(`unknown censorship type: '${this.rawData.censorship}'`);
        }
        return SummaryDataModel.censorshipMap.get(this.rawData.censorship);
    }

    // TODO Move to translation files
    private static gameLengthMap = new Map<string, string>([
        ["VERY_SHORT", "< 2 hours"],
        ["SHORT", "2 - 10 hours"],
        ["MEDIUM", "10 - 30 hours"],
        ["LONG", "30 - 50 hours"],
        ["VERY_LONG", "> 50 hours"],
    ])
    public GetGameLength(locale: string = ""): string | undefined {
        if (this.rawData.visualNovelLength == undefined || this.rawData.visualNovelLength == "UNKNOWN") {
            return undefined
        }
        if (!SummaryDataModel.gameLengthMap.has(this.rawData.visualNovelLength)) {
            throw new Error(`unknown game length type: '${this.rawData.visualNovelLength}'`);
        }
        return SummaryDataModel.gameLengthMap.get(this.rawData.visualNovelLength);
    }
}

export default SummaryDataModel