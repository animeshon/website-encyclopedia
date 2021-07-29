import Entity from "@/models/entity";
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

    constructor(rawData: any) {
        super(rawData.character);

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
    public static GetRole(role: string, locale: string = ""): string | undefined {
        if (role == undefined || role == "") {
            return undefined
        }
        if (!CharacterDataModel.characterRoleMap.has(role)) {
            throw new Error(`unknown character role: '${role}'`);
        }
        return CharacterDataModel.characterRoleMap.get(role);
    }

    public GetRole(locale: string = ""): string | undefined {
        return CharacterDataModel.GetRole(this.characterRelation, locale);
    }
}

export class CharacterDataModelList {
    list: CharacterDataModel[];

    constructor(rawData: any[]) {
        this.list = [];
        for (let data of rawData) {
            const char = new CharacterDataModel(data);
            this.list.push(char);
        }
    }

    public Localize(locale: string = "eng"): void {
        for (let char of this.list) {
            char.Localize(locale);
        }
    }

    public Size(): number {
        return this.list.length;
    }

    public Get(): CharacterDataModel[] {
        return this.list;
    }

    public GetByRelation(relation: string): CharacterDataModel[] {
        return this.list.filter(c => c.Relation() == relation);
    }

    public ContainsString(str: string): CharacterDataModel[] {
        if (str == "") {
            return this.list;
        }
        const _str = str.toLowerCase();
        return this.list.filter(c => c.GetNames().Get().toLowerCase().includes(_str));
    }

    public GetCharacter(id: string): CharacterDataModel | undefined {
        return this.list.find(c => c.GetID() == id);
    }

    public SetSeyuus(rawData: any[]): void {
        for (let seyuu of rawData) {
            const char = this.GetCharacter(seyuu.voiced.id)
            if (char == undefined) {
                continue;
            }
            char.SetSeyuu(new Seyuu(seyuu));
        }
    }

    // TODO ENUM
    public Sort(by: string = "NAME"): void {
        this.list = this.list.sort((a, b) => {
            return a.GetNames().Get() < b.GetNames().Get() ? -1 : 1;
        })
    }
}

export default CharacterDataModel;