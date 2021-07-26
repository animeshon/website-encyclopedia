import Entity from "@/models/entity";

class RelatedContentDataModel extends Entity {
    protected relationType: string;

    constructor(rawData: any) {
        super(rawData.object);

        this.relationType = rawData.type;
    }

    // TODO Move to translation files
    private static contentRelationMap = new Map<string, string>([
        ["ADAPTATION", "Adapted from"],
        ["BASE", "Adaptation"],
        ["SAME_SETTING", "Same Settings"],
        ["ALTERNATIVE_SETTING", "Alternative Settings"],
        ["ALTERNATIVE_VERSION", "Alternative Version"],
        ["CHARACTER", "Characters"],
        ["FULL_STORY", "Full Story"],
        ["SUMMARY", "Summary"],
        ["PARENT_STORY", "Parent Story"],
        ["SPIN_OFF", "Spin-Off"],
        ["PREQUEL", "Prequel"],
        ["SEQUEL", "Sequel"],
        ["MAIN_STORY", "Main Story"],
        ["SIDE_STORY", "Side Story"],
        ["ORIGINAL", "Original"],
        ["PARODY", "Parody"],
    ]);
    public GetRelation(locale: string = ""): string | undefined {
        if (this.relationType == undefined || this.relationType == "") {
            return undefined
        }
        if (!RelatedContentDataModel.contentRelationMap.has(this.relationType)) {
            throw new Error(`unknown content relation: '${this.relationType}'`);
        }
        return RelatedContentDataModel.contentRelationMap.get(this.relationType);
    }
}

export class RelatedContentDataModelList {
    list: RelatedContentDataModel[];

    constructor(rawData: any[]) {
        this.list = [];
        for (let data of rawData) {
            const char = new RelatedContentDataModel(data);
            this.list.push(char);
        }
    }

    public Localize(locale: string = "eng"): void {
        for (let relations of this.list) {
            relations.Localize(locale);
        }
    }

    public Size(): number {
        return this.list.length;
    }

    public Get(): RelatedContentDataModel[] {
        return this.list;
    }
}

export default RelatedContentDataModel;