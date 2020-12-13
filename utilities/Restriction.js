export const Restrictions = (r) => {
    let res = [];
    (r || []).forEach(element => {
        switch (element.tag) {
            case "MINOR-R18":
                res.push("Prohibited in multiple regions according to U.N. guidelines");
        }
    });

    return res;
};