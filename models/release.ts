import Entity, { LocalizedEnum } from "@/models/entity";
import EntityList from "@/models/entity-list";

class ReleaseDataModel extends Entity {
    constructor(rawData: any) {
        super(rawData);
    }
}

export class ReleaseDataModelList extends EntityList<ReleaseDataModel> {
    constructor(rawData: any[]) {
        if (typeof rawData == 'number') {
            super(rawData);
            return;
        }
        super(0);
        for (let data of rawData) {
            const d = new ReleaseDataModel(data);
            this.push(d);
        }
    }

    public GetAllPlatforms(locale: string = "en"): LocalizedEnum[] {
        const platforms: LocalizedEnum[] = [];
        for (const l of this) {
            l.Platforms().forEach(p => {
                if (!platforms.find(s => s.value == p)) {
                    platforms.push({ value: p, label: ReleaseDataModel.LocalizePlatform(p, locale) });
                }
            })
        };
        return platforms;
    }
}

export default ReleaseDataModel;