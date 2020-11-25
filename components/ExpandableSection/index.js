import React, { useState } from 'react';

import styles from './ExpandableSection.module.css';

const ExpandableSection = ({ label, openDefault = true, children }) => {
    const [open, setOpen] = useState(openDefault);

    return (
        <section key={label} className={styles.expandable_section}>
            <h4>
                <button name={label} onClick={() => setOpen(!open)} >
                    <span className="label">
                        {label}
                    </span>
                    <span className="line" />
                    <span className={`toggler ${open ? 'opened' : 'closed' }`} />
                </button>
            </h4>
            <div className={`${styles.expanded_section} ${open ? styles.opened : styles.closed}`} >
                { children }
            </div>
        </section>
    );
};

export default ExpandableSection;