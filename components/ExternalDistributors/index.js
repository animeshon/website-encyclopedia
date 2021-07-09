import React, { useState } from 'react';
import cn from 'classnames';

import styles from './ExternalDistributors.module.css';
import FilterSelect from '@/components/Filter/FilterSelect';



const mockShops = [
    { region: "USA", url: "s", name: "amazon" },
    { region: "", url: "f", name: "ebay" },
    { region: "", url: "a", name: "cdjapan" },
    { region: "JNP", url: "c", name: "viz" },
    { region: "JNP", url: "z", name: "crunchyroll" },
]

const regionToString = (region) => {
    return region != "" ? region : "Global";
}

const ExternalDistributors = ({ shops = mockShops }) => {
    const values = [];
    let defaultValue = undefined;
    shops.map(s => {
        if (values.findIndex((v) => (v.value === s.region)) != -1) {
            return;
        }
        const v = { value: s.region, label: regionToString(s.region) };
        
        // any first
        // then global
        // then JPN
        if (defaultValue == undefined) {
            defaultValue = v;
        } else if (s.region == "") {
            defaultValue = v;
        }
        else if (s.region == "USA") {
            defaultValue = v;
        } else if (s.region == "JPN") {
            defaultValue = v;
        }
        
        values.push(v)
    });
    
    const [filterRegon, setFilterRegion] = useState(defaultValue);

    return (
        <section className="landing-section-box">
            <div>
                <header className={styles.header}>
                    <h3>Available on</h3>

                    <div className={styles["region-filter"]}>
                        <FilterSelect
                            height={30}
                            options={values}
                            value={filterRegon}
                            onChange={(e) => setFilterRegion(e)} />
                    </div>

                </header>
            </div>
            <div className="grid-halves manga-links">
                <div className="links-row">
                    {shops.filter(s => {return s.region == filterRegon.value}).map(link => {
                        return (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                className="external-platform-button"
                            >
                                <img src={`/images/${link.name}.png`} alt={link.name} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExternalDistributors;