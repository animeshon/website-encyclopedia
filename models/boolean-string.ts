
class BooleanString {
    value: string;
    constructor(value: string) {
        this.value = value;
    }

    public Value(): boolean | undefined {
        if (this.value == "TRUE") {
            return true;
        } else if (this.value == "FALSE") {
            return false;
        } else {
            return undefined;
        }
    }

    public ToString(t: string, f: string): string | undefined {
        const val = this.Value();
        if (val == undefined) {
            return undefined;
        }
        return val ? t : f;
    }
}

export default BooleanString;