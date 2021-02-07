import React, { useState } from 'react';
import cn from 'classnames';

import { MdTune } from 'react-icons/md';
import styles from './FilterGroup.module.css';

const FilterGroup = ({ toggable = true, visible = false, buttonRight = true, filterRight = false, className, classNameOpen, children }) => {
    const [showFilters, setShowFilters] = useState(visible);
    const [isToggable, setToggable] = useState(toggable);

    return (
        <div className={cn(className, styles['filter-group'])}>
            {isToggable && <div className={cn(styles['hider'], buttonRight ? styles['right'] : undefined)}>
                <button className="btn cherry-red" type="button" onClick={() => setShowFilters(!showFilters)}><MdTune />Filter</button>
            </div>}

            <div className={cn(styles['filters'], 
            showFilters ? styles['visible'] : styles['hidden'], 
            showFilters ? classNameOpen : undefined, 
            filterRight ? styles['right'] : undefined)}>
                {children}
            </div>
        </div>
    );
};

export default FilterGroup;