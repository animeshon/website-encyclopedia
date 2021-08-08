import Entity, { LocalizedEnum } from "@/models/entity";

class ReleaseDataModel extends Entity {
    protected platforms: string[];

    constructor(rawData: any) {
        super(rawData);

        this.platforms = rawData.platforms;
    }

    public Platforms(): string[] {
        return this.platforms;
    }


    // TODO Move to translation files
    private static platformMap = new Map<string, string>([
        ["WINDOWS", "Windows"],
        ["DOS", "Dos"],
        ["LINUX", "Linux"],
        ["MAC", "Macintosh"],
        ["IOS", "iOS"],
        ["ANDROID", "Android"],
        ["DVD_PLAYER", "DVD Player"],
        ["BLU_RAY_PLAYER", "Blue-Ray Player"],
        ["FM_TOWNS", "FM Towns"],
        ["GAMEBOY_ADVANCE", "GameBoy Advance"],
        ["GAMEBOY_COLOR", "GameBoy Color"],
        ["NES", "Nintendo Nes"],
        ["PC88", "PC 88"],
        ["PC98", "PC 93"],
        ["PC_ENGINE", "PC Engine"],
        ["PC_FX", "Pc-FX"],
        ["PSP", "PlayStation Portable"],
        ["PS1", "PlayeStation"],
        ["PS2", "PlayeStation2"],
        ["PS3", "PlayeStation3"],
        ["PS4", "PlayeStation4"],
        ["PS_VITA", "PlayeStation Vita"],
        ["DGRAMCAST", "Dramcast"],
        ["SEGA_SATURN", "Saga Saturn"],
        ["SUPER_NINTENDO", "Super Nintendo"],
        ["NINTENDO_SWITCH", "Nintendo Switch"],
        ["NINTENDO_WII", "Nintendo Wii"],
        ["NINTENDO_WII_U", "Nintendo Wii U"],
        ["NINTENDO_3DS", "Nintendo 3DS"],
        ["X68000", "X68000"],
        ["XBOX_ONE", "Xbox One"],
        ["XBOX_360", "Xbox 360"],
        ["XBOX", "Xbox"],
        ["WEBSITE", "Web Game"],
        ["OTHER", "Other"],
    ]);
    public static LocalizePlatform(p: string, locale: string = ""): string | undefined {
        if (p == undefined) {
            return undefined
        }
        if (!ReleaseDataModel.platformMap.has(p)) {
            throw new Error(`unknown release platform: '${p}'`);
        }
        return ReleaseDataModel.platformMap.get(p);
    }

    public LocalizedPlatforms(locale: string = "en"): string[] {
        return this.platforms.map(p => ReleaseDataModel.LocalizePlatform(p, locale));
    }
}

export enum SortBy {
    DATE,
    NAME,
}
export class ReleaseDataModelList extends Array<ReleaseDataModel> {
    constructor(rawData: any[]) {
        if (typeof rawData == 'number') {
            super(rawData);
            return;
        }
        super();
        for (let data of rawData) {
            const d = new ReleaseDataModel(data);
            this.push(d);
        }
    }

    public Localize(locale: string = "eng"): void {
        for (let e of this) {
            e.Localize(locale);
        }
    }

    public Size(): number {
        return this.length;
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

    public ContainsString(str: string): ReleaseDataModelList {
        if (str == "") {
            return this;
        }
        const _str = str.toLowerCase();
        return this.filter(c => c.GetNames().Get().toLowerCase().includes(_str)) as ReleaseDataModelList;
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
}

export default ReleaseDataModel;