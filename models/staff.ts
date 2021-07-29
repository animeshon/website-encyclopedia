import Entity from "@/models/entity";
import Localization from "@/models/localization";
import { Role } from '@/utilities/TypedRole';

class StaffDataModel extends Entity {
    protected jobRole: string;
    localization: Localization;

    constructor(rawData: any) {
        super(rawData.collaborator);

        this.jobRole = rawData.role.type;
        this.localization = Localization.FromRawData(rawData.localization);
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

export enum SortBy {
    DATE,
    NAME,
} 
export class StaffDataModelList extends Array<StaffDataModel> {
    constructor(rawData: any[]) {
        if (typeof rawData == 'number') {
            super(rawData);
            return;
        }
        super();
        for (let data of rawData) {
            const d = new StaffDataModel(data);
            this.push(d);
        }
    }

    public Localize(locale: string = "eng"): void {
        for (let staff of this) {
            staff.Localize(locale);
        }
    }

    public Size(): number {
        return this.length;
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

    public Sort(by: SortBy = SortBy.DATE): void {
        this.sort((a, b) => {
            if (by == SortBy.NAME) {
                return a.GetNames().Get() < b.GetNames().Get() ? -1 : 1;
            }
        })
    }
}

export default StaffDataModel;