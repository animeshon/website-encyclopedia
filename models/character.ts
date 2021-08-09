import Entity from "@/models/entity";
import EntityList from "@/models/entity-list";
import Localization from "@/models/localization";

export class Seyuu extends Entity {

    isPrimary: Boolean;
    localization: Localization;

    constructor(rawData: any) {
        super(rawData.actor);

        this.isPrimary = rawData.isPrimary;
        this.localization = Localization.FromRawData(rawData.localization);
    }

    public GetLocalization(): Localization {
        return this.localization;
    }
}

class CharacterDataModel extends Entity {
    protected characterRelation: string;
    protected seyuus: Seyuu[];

    constructor(rawData: any, field: string) {
        super(rawData[field]);

        this.characterRelation = rawData.relation;
        this.seyuus = [];
    }

    public Localize(locale: string = "eng"): void {
        super.Localize(locale);
        for (let s of this.seyuus) {
            s.Localize(locale);
        }
    }

    public Relation(): string {
        return this.characterRelation;
    }

    public SetSeyuu(seyuu: Seyuu): void {
        this.seyuus.push(seyuu);
    }

    public GetSeyuus(lang: string): Seyuu[] {
        // TODO add checks both on code and aplha2
        return lang == "" ? this.seyuus : this.seyuus.filter(s => s.GetLocalization().GetLanguage().code == lang);
    }

    // TODO Move to translation files
    private static characterRoleMap = new Map<string, string>([
        ["MAIN", "Main Character"],
        ["SUPPORT", "Support Character"],
        ["APPEARS", "Appearance"],
    ]);
    public static LocalizeRole(role: string, locale: string = ""): string | undefined {
        if (role == undefined || role == "") {
            return undefined
        }
        if (!CharacterDataModel.characterRoleMap.has(role)) {
            throw new Error(`unknown character role: '${role}'`);
        }
        return CharacterDataModel.characterRoleMap.get(role);
    }

    public GetRole(locale: string = ""): string | undefined {
        return CharacterDataModel.LocalizeRole(this.characterRelation, locale);
    }
}

export class CharacterDataModelList extends EntityList<CharacterDataModel> {
    constructor(len) {
        super(len);
    }

    static FromCharacterRawData(rawData): CharacterDataModelList {
        const l = new CharacterDataModelList(0);
        for (let data of rawData) {
            const char = new CharacterDataModel(data, "character");
            l.push(char);
        }
        return l;
    }

    static FromContentRawData(rawData: any[]): CharacterDataModelList {
        const l = new CharacterDataModelList(0);
        for (let data of rawData) {
            const d = new CharacterDataModel(data, "content");
            l.push(d);
        }
        return l;
    }

    public Get(): CharacterDataModel[] {
        return this;
    }

    public GetByRelation(relation: string): CharacterDataModelList {
        return this.filter(c => relation?.length ? c.Relation() == relation : true) as CharacterDataModelList;
    }

    public GetAllRoles(priorty: string[] = []): string [] {
        const roles = [];
        for (const l of this) {
            if (!roles.includes(l.Relation())) {
                roles.push(l.Relation());
            }
        }
        return roles.sort((a, b) => {
            if (priorty.includes(a) && priorty.includes(b)) {
                return 0;
            } 
            if (priorty.includes(a)) {
                return -1;
            }
            if (priorty.includes(b)) {
                return 1;
            }
            return a.localeCompare(b);
        })
    } 

    public SetSeyuus(rawData: any[]): void {
        for (let seyuu of rawData) {
            const char = this.GetByID(seyuu.voiced.id)
            if (char == undefined) {
                continue;
            }
            char.SetSeyuu(new Seyuu(seyuu));
        }
    }
}

export default CharacterDataModel;