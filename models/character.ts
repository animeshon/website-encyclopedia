import Entity from "@/models/entity";

class CharacterDataModel extends Entity {
    protected characterRelation: string;

    constructor(rawData: any) {
        super(rawData.character);

        this.characterRelation = rawData.relation;
    }

    // TODO Move to translation files
    private static characterRoleMap = new Map<string, string>([
        ["MAIN", "Main Character"],
        ["SUPPORT", "Support Character"],
        ["APPEARS", "Appearance"],
    ]);
    public GetRole(locale: string = ""): string | undefined {
        if (this.characterRelation == undefined || this.characterRelation == "") {
            return undefined
        }
        if (!CharacterDataModel.characterRoleMap.has(this.characterRelation)) {
            throw new Error(`unknown character role: '${this.characterRelation}'`);
        }
        return CharacterDataModel.characterRoleMap.get(this.characterRelation);
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
}

export default CharacterDataModel;