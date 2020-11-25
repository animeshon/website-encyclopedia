import { useState } from 'react';

import styles from './TabNavigation.module.css';

import Link from 'next/link';

const BASEPATH = process.env.NEXT_PUBLIC_BASEPATH || '';

const TabNavigation = ({ items = [], selected }) => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);

    const handleMobileMenu = condition => {
        setIsMobileMenu(condition);
    };

    const renderTabs = () =>
        items.map((item, index) => {
            const isSelected = selected === item.label;

            return (
                <li
                    key={index}
                    className={`${styles.tab_navigation__list_item} 
                    ${isSelected ? styles.selected : ''}`}
                >
                    <Link href={item.href} as={item.as}>
                        <a>{item.label}</a>
                    </Link>
                </li>
            );
        });

    return (
        <div className={styles.tab_navigation}>
            <button
                onClick={() => handleMobileMenu(true)}
                className={styles.tab_navigation__mobile}
            >
                {selected}
            </button>
            <div className="internal-grid">
                <ul
                    className={`${styles.tab_navigation__list} 
                    ${isMobileMenu ? styles.opened : ''}
                    `}
                >
                    {renderTabs()}
                </ul>
            </div>
            <div
                className={`${styles.overlay} ${isMobileMenu ? styles.visible : styles.invisible}`}
                onClick={() => handleMobileMenu(false)}
            />
        </div>
    );
};

export default TabNavigation;
