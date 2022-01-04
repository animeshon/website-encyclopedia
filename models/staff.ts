import Entity from "@/models/entity";
import Localization from "@/models/localization";
import { Role } from '@/utilities/TypedRole';
import EntityList from "@/models/entity-list";

class StaffDataModel extends Entity {
    protected jobRole: string;
    localization: Localization;

    public loadRawData(rawData: any) {
        super.loadRawData(rawData.collaborator);
        this.jobRole = rawData.role.type;
    }

    constructor(localization: any) {
        super();

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
}

export class StaffDataModelList extends EntityList<StaffDataModel> {
    constructor(rawData: any[]) {
        if (typeof rawData == 'number') {
            super(rawData);
            return;
        }
        super(0);
        for (let data of rawData) {
            const d = new StaffDataModel(data.localization);
            d.loadRawData(data);
            this.push(d);
        }
    }

    public GetAllJobs(priorty: string[] = []): string [] {
        const relations = [];
        for (const l of this) {
            if (!relations.includes(l.JobRole())) {
                relations.push(l.JobRole());
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

    public GetByJobRole(job: string): StaffDataModelList {
        return this.filter(c => c.JobRole() == job) as StaffDataModelList;
    }
}

export default StaffDataModel;