import { useState } from 'react';
import { useRouter } from 'next/router';

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
                    className={`tab-navigation__list-item${
                        isSelected ? ' selected' : ''
                    }`}
                >
                    <Link href={item.href} as={item.as}>
                        <a>{item.label}</a>
                    </Link>
                </li>
            );
        });
    
    return (
        <div className="tab-navigation">
            <button
                onClick={() => handleMobileMenu(true)}
                className="tab-navigation__mobile"
            >
                {selected}
            </button>
            <div className="internal-grid">
                <ul
                    className={`tab-navigation__list${
                        isMobileMenu ? ' opened' : ''
                    }`}
                >
                    {renderTabs()}
                </ul>
            </div>
            <div
                className={`overlay${isMobileMenu ? ' visible' : 'invisible'}`}
                onClick={() => handleMobileMenu(false)}
            />
        </div>
    );
};

export default TabNavigation;
