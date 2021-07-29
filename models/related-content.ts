import Entity from "@/models/entity";

class RelatedContentDataModel extends Entity {
    protected relationType: string;

    constructor(rawData: any) {
        super(rawData.object);

        this.relationType = rawData.type;
    }

    public Relation(): string {
        return this.relationType;
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
    private static LocalizeRelation(rel:string, locale: string = ""): string | undefined {
        if (rel == undefined || rel == "") {
            return undefined;
        }
        if (!RelatedContentDataModel.contentRelationMap.has(rel)) {
            throw new Error(`unknown content relation: '${rel}'`);
        }
        return RelatedContentDataModel.contentRelationMap.get(rel);
    }
    public GetRelation(locale: string = ""): string | undefined {
        return RelatedContentDataModel.LocalizeRelation(this.relationType);
    }
}

export enum SortBy {
    DATE,
    NAME,
} 
export class RelatedContentDataModelList extends Array<RelatedContentDataModel> {
    constructor(rawData: any[]) {
        if (typeof rawData == 'number') {
            super(rawData);
            return;
        }
        super();
        for (let data of rawData) {
            const d = new RelatedContentDataModel(data);
            this.push(d);
        }
    }

    public Localize(locale: string = "eng"): void {
        for (let relations of this) {
            relations.Localize(locale);
        }
    }

    public Size(): number {
        return this.length;
    }

    public GetAllRelations(priorty: string[] = []): string [] {
        const relations = [];
        for (const l of this) {
            if (!relations.includes(l.Relation())) {
                relations.push(l.Relation());
            }
        }
        return relations.sort((a, b) => {
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

    public GetAllTypes(): string [] {
        const types = [];
        for (const l of this) {
            if (!types.includes(l.Type())) {
                types.push(l.Type());
            }
        }
        return types.sort((a, b) => {
            return a.localeCompare(b);
        })
    } 

    public GetByRelation(relation: string): RelatedContentDataModelList {
        return this.filter(c => c.Relation() == relation) as RelatedContentDataModelList;
    }

    public GetByTypes(types: string[]): RelatedContentDataModelList {
        return this.filter(c => types.includes(c.Type())) as RelatedContentDataModelList;
    }

    public Sort(by: SortBy = SortBy.DATE): void {
        this.sort((a, b) => {
            if (by == SortBy.NAME) {
                return a.GetNames().Get() < b.GetNames().Get() ? -1 : 1;
            } else if (by == SortBy.DATE) {
                return a.Premiere().getTime() < b.Premiere().getTime() ? -1 : 1;
            }
        })
    }
}

export default RelatedContentDataModel;