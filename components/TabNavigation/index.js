import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';

const TabNavigation = ({ items = [], selected }) => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const router = useRouter();
    const { route } = router;

    const handleMobileMenu = condition => {
        setIsMobileMenu(condition);
    };

    const renderTabs = () =>
        items.map((item, index) => {
            const selectedItem = route === item.href;

            return (
                <li
                    key={index}
                    className={`tab-navigation__list-item${
                        selectedItem === true ? ' selected' : ''
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
