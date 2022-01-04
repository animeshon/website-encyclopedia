import Entity, { LocalizedEnum } from "@/models/entity";

export enum SortBy {
    DATE,
    NAME,
}

class EntityList<T extends Entity> extends Array<T> {
    constructor(len) {
        super(len);
    }

    public static DefaultFromRawData(rawData: any[]): EntityList<Entity> {
        const l = new EntityList<Entity>(0);
        for (let d of rawData) {
            const e = new Entity();
            e.loadRawData(d);
            l.push(e);
        }
        return l
    }

    public Localize(locale: string = "eng"): void {
        for (let e of this) {
            e.Localize(locale);
        }
    }

    public Size(): number {
        return this.length;
    }

    public Sort(by: SortBy = SortBy.DATE): void {
        this.sort((a, b) => {
            if (by == SortBy.NAME) {
                return a.GetNames().Get() < b.GetNames().Get() ? -1 : 1;
            } else if (by == SortBy.DATE) {
                const getTime = (date) => {
                    return date ? new Date(date).getTime() : 9999999999999;
                }
                return getTime(a.Premiere()) < getTime(b.Premiere()) ? -1 : 1;
            }
        })
    }

    public GetAllTypes(): string[] {
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

    public GetAllSubtypes(locale: string = "en"): LocalizedEnum[] {
        const subTypes: LocalizedEnum[] = [];
        for (const l of this) {
            if (!subTypes.find(s => s.value == l.Subtype())) {
                subTypes.push({ value: l.Subtype(), label: l.GetSubtype(locale) });
            }
        }
        return subTypes.sort((a, b) => {
            return a.label.localeCompare(b.label);
        })
    }

    public ContainsString(str: string): EntityList<T> {
        if (str == "") {
            return this;
        }
        const _str = str.toLowerCase();
        return this.filter(c => c.GetNames().Get().toLowerCase().includes(_str)) as EntityList<T>;
    }

    public GetByTypes(types: string[]): EntityList<T> {
        return this.filter(c => types.includes(c.Type())) as EntityList<T>;
    }

    public GetByID(id: string): T | undefined {
        return this.find(c => c.GetResourceName() == id);
    }
}

export default EntityList;