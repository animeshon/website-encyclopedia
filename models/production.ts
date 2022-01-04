import Entity from "@/models/entity";
import Localization from "@/models/localization";
import EntityList from "@/models/entity-list";
import { Role } from '@/utilities/TypedRole';

export class RoleData {
    protected name : string;
    protected jobRole: string;
    localization: Localization;

    // TODO handle freetext role
    constructor(rawData: any, localization: any) {
        this.name = rawData.name;
        this.jobRole = rawData.type;
        this.localization = Localization.FromRawData(localization);
    }

    public JobRole(): string {
        return this.jobRole;
    }

    public GetJobRole(locale: string = "eng"): string {
        return Role(this.jobRole)
    }

    public GetLocalization(): Localization {
        return this.localization;
    }

    public GetResourceName(): string {
        return this.name;
    }
}

class ProductionModel extends Entity {
    roles: RoleData[];

    constructor() {
        super();
        this.roles = [];
    }

    public Localize(locale: string = "en") {
        super.Localize(locale);
        // for (let a of this.roles) {
        //     a.Localize(locale);
        // }
    }

    public GetLocalization(): Localization {
        return this.roles.length ? this.roles[0].GetLocalization() : undefined;
    }

    public AddRole(m: RoleData) {
        this.roles.push(m);
    }

    public Roles(): RoleData[] {
        return this.roles;
    }
}

export class ProductionModelList extends EntityList<ProductionModel> {
    constructor(len) {
        super(len);
    }

    static FromRawData(rawData: any[], field: string): ProductionModelList {
        const l = new ProductionModelList(0);
        for (let data of rawData) {
            let va = l.GetByID(data[field].name);
            if (undefined == va) {
                va = new ProductionModel();
                va.loadRawData(data[field]);
                // prune not handled resources (which are release for now)
                if (!va.IsContent()) {
                    continue;
                }
                l.push(va);
            }

            const role = new RoleData(data.role, data.localization);
            va.AddRole(role);
        }
        return l;
    }
}

export default ProductionModel;