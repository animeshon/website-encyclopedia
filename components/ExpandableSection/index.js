import React, { useState } from 'react';
import cn from 'classnames';

import styles from './ExpandableSection.module.css';

const ExpandableSection = ({ label, openDefault = true, className, children }) => {
    const [open, setOpen] = useState(openDefault);

    return (
        <section key={label} className={cn(className, styles.expandable_section)}>
            <h4>
                <button name={label} onClick={() => setOpen(!open)} >
                    <span className={styles.label}>
                        {label}
                    </span>
                    <span className={styles.line} />
                    <span className={`${styles.toggler} ${open ? styles.opened : styles.closed }`} />
                </button>
            </h4>
            <div className={`${styles.expanded_section} ${open ? styles.opened : styles.closed}`} >
                { children }
            </div>
        </section>
    );
};

export default ExpandableSection;