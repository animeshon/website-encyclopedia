import Entity from "@/models/entity";
import EntityList from "@/models/entity-list";

class RelatedContentDataModel extends Entity {
    protected relationType: string;

    public loadRawDataEx(rawData: any, field: string) {
        super.loadRawData(rawData[field]);
        this.relationType = rawData.type;
    }

    constructor() {
        super();
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

export class RelatedContentDataModelList extends EntityList<RelatedContentDataModel> {
    constructor(len) {
        super(len);
    }

    static FromRelatedRawData(rawData: any[]): RelatedContentDataModelList {
        const l = new RelatedContentDataModelList(0);
        for (let data of rawData) {
            const d = new RelatedContentDataModel();
            d.loadRawDataEx(data, "object");
            l.push(d);
        }
        return l;
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

    public GetByRelation(relation: string): RelatedContentDataModelList {
        return this.filter(c => c.Relation() == relation) as RelatedContentDataModelList;
    }
}

export default RelatedContentDataModel;