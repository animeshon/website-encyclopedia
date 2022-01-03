import Entity from "@/models/entity";
import { Restrictions, MaturityRating } from '@/utilities/Restriction';
import { FormatNoYear } from '@/utilities/Time';
import { Role } from '@/utilities/TypedRole';
import { GameVoice } from '@/utilities/GameVoice';
import { GameAnimation } from '@/utilities/GameAnimation';

interface CollaboratorsInfo {
    key: string;
    value: any[];
}

class SummaryDataModel extends Entity {

    collaborators: Map<string, Entity[]>;

    constructor() {
        super();

        this.collaborators = new Map<string, Entity[]>();
    }

    public Details(locale: string = "eng"): any {
        let name = this.names.GetLocalized();

        const externalSources = this.GetExternalSources();
        const collaborations = this.GetCollaborators(locale);
        const guiseOfs = this.GuiseOf().map(g => { return {
            text: g.GetNames().Get(),
            href: g.GetURI(),
        }});

        return [
            [
                { key: 'Name', value: name },
                { key: 'Original', value: this.names.GetOriginal() },
                { key: 'Romaji', value: this.names.GetTranscripted() },
                { key: 'Languages', value: this.LocalizedLanguages()?.map(l => { return { text: l.label } }) },
            ],
            [
                //this.Type() == "organization" ? { key: 'Organization Type', value: this.GetSubtype()} : undefined ,
                { key: 'Status', value: this.GetStatus() },
                this.GetRunning() != undefined ?
                    { key: 'Running', value: this.GetRunning() } :
                    { key: 'Released', value: this.GetReleaseDate() },
                { key: 'Season', value: this.GetSeason() },
                { key: 'Birthday', value: this.GetBirthday() },
                { key: 'Age', value: this.Age() ?? this.LocalizeAgeType() },
                { key: 'Foundation', value: this.GetFoundation() },
                // TODO Move to translation files
                { key: 'Audience Target', value: this.GetAudienceTarget() },
                { key: 'Content Focus', value: this.GetContentFocus() },
                { key: 'Gender', value: this.GetGender() },
                { key: 'Blood Type', value: this.GetBloodType() },
                { key: 'Length', value: this.GetGameLength() },
                guiseOfs.length != 0 ? { key: 'Guise of', value: guiseOfs } : undefined,
            ],
            [
                { key: 'Is Original', value: this.IsOriginal().ToString("Yes", "No") },
                { key: 'Is Self Published', value: this.IsContent() ? this.Independent() ? "Yes" : "No" : undefined },
                { key: 'Is Freeware', value: this.IsFree().ToString("Yes", "No") },
                { key: 'Patchable Release', value: this.IsPatch().ToString("Yes", "No") },
            ],
            [
                { key: 'Voiced', value: GameVoice(this.rawData.voicedDegree).name },
                { key: 'Animation', value: GameAnimation(this.rawData.animationStoryDegree).name },
                { key: 'Animation Erotic Scenes', value: GameAnimation(this.rawData.animationEroDegree).name },
                { key: 'Platforms', value: this.LocalizedPlatforms().map(p => {return {text: p}}) },
            ],
            [
                { key: 'Resolution', value: this.rawData.widthResolution && this.rawData.heightResolution ? `${this.rawData.widthResolution}x${this.rawData.heightResolution}` : undefined },
                { key: 'Engine', value: this.rawData.engine },
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
                const ent = new Entity();
                ent.loadRawData(v.collaborator);
                this.collaborators.set(v.role.type, [ent]);
            } else {
                const ent = new Entity();
                ent.loadRawData(v.collaborator);
                this.collaborators.set(v.role.type, this.collaborators.get(v.role.type).concat(ent));
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

    public GuiseOf(): Entity[] {
        if (this.rawData.guiseOf == undefined) {
            return [];
        }
        const guiseof: Entity[] = [];
        for (let r of this.rawData.guiseOf) {
            const g = new Entity();
            g.loadRawData(r);
            g.Localize();
            guiseof.push(g);
        }
        return guiseof;
    }

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