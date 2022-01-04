import Entity from "@/models/entity";
import Localization from "@/models/localization";
import EntityList, { SortBy as entitySortBy } from "@/models/entity-list";
import BooleanString from "@/models/boolean-string";

export enum SortBy {
    DATE,
    NAME,
    LOCALIZATION,
}

class AudibleModel extends Entity {
    primary: BooleanString;
    localization: Localization;

    constructor(primary: BooleanString, localization: any) {
        super();
        this.primary = primary;
        this.localization = Localization.FromRawData(localization);
    }

    public IsPrimary(): BooleanString {
        return this.primary;
    }

    public GetLocalization(): Localization {
        return this.localization;
    }
}

class VoiceActingModel extends Entity {
    audibles: EntityList<AudibleModel>;

    constructor() {
        super();
        this.audibles = new EntityList<AudibleModel>(0);
    }

    public Localize(locale: string = "en") {
        super.Localize(locale);
        for (let a of this.audibles) {
            a.Localize(locale);
        }
    }

    public GetLocalization(): Localization {
        return this.audibles.length ? this.audibles[0].GetLocalization() : undefined;
    }

    public AddAudible(m: AudibleModel) {
        this.audibles.push(m);
    }

    public Audibles(): EntityList<AudibleModel> {
        return this.audibles;
    }
}

export class VoiceActingModelList extends EntityList<VoiceActingModel> {
    constructor(len) {
        super(len);
    }

    static FromRawData(rawData: any[], field: string): VoiceActingModelList {
        const l = new VoiceActingModelList(0);
        for (let data of rawData) {
            let va = l.GetByID(data[field].name);
            if (undefined == va) {
                va = new VoiceActingModel();
                va.loadRawData(data[field]);
                l.push(va);
            }

            const aud = new AudibleModel(new BooleanString(data.primary), data.localization);
            aud.loadRawData(data.content);
            va.AddAudible(aud);
        }
        return l;
    }

    public Sort(by: SortBy = SortBy.DATE): void {
        if (by == SortBy.NAME || SortBy.DATE) {
            super.Sort(by as entitySortBy);
        } else {
            this.sort((a, b) => {
                if (by == SortBy.LOCALIZATION) {
                    return a.GetLocalization().tag > b.GetLocalization().tag ? -1 : 1;
                }
            })
        }
    }

    public ContainsString(str: string): VoiceActingModelList {
        if (str == "") {
            return this;
        }
        const _str = str.toLowerCase();
        return this.filter(c => c.GetNames().Get().toLowerCase().includes(_str) || undefined != c.Audibles().find(a => a.GetNames().Get().toLowerCase().includes(_str))) as VoiceActingModelList;
    }
}

export default VoiceActingModel;