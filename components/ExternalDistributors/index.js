import React, { useState } from 'react';
import cn from 'classnames';

import styles from './ExternalDistributors.module.css';
import FilterSelect from '@/components/Filter/FilterSelect';

const ExternalDistributors = ({ shops }) => {
    const values = [];
    let defaultValue = undefined;

    shops.map(s => {
        const region = s.GetCountry();
        if (values.findIndex((v) => (v.value === region)) != -1) {
            return;
        }
        const v = { value: region, label: s.GetCountryLabel() };
        
        // any first
        // then global
        // then JPN
        if (defaultValue == undefined) {
            defaultValue = v;
        } else if (region == "") {
            defaultValue = v;
        } else if (region == "USA") {
            defaultValue = v;
        } else if (region == "JPN") {
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
                    {shops.filter(s => {return s.GetCountry() == filterRegon.value}).map(link => {
                        return (
                            <a
                                key={link.GetURL()}
                                href={link.GetURL()}
                                target="_blank"
                                className="external-platform-button"
                            >
                                <img src={link.GetImageURL()} alt={link.GetName()} />
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExternalDistributors;