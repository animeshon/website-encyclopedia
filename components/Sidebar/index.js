import Link from 'next/link';
import Router, { withRouter } from 'next/router';

import { SetSafeSearch } from '@/utilities/SafeSearch';

const routes = [
    { href: 'https://animeshon.com/', label: 'About Animeshon' },
    { href: 'https://www.iubenda.com/privacy-policy/48776658', label: 'Privacy Policy' },
    { href: 'https://www.iubenda.com/privacy-policy/48776658/cookie-policy', label: 'Cookie Policy' },
    { href: 'https://www.iubenda.com/terms-and-conditions/48776658', label: 'Terms and Conditions' },
    { href: '/animeshon/contacts', label: 'Contacts' },
    { href: '/animeshon/license', label: 'License' },
    { href: 'https://github.com/animeshon/website-encyclopedia', label: 'GitHub' },
];

const RenderRoutes = ({ arr, closeSidebar, page }) => {
    return arr.map(item => {
        return (
            <li key={item.href} onClick={closeSidebar}>
                <Link href={item.href}>
                    <a className={page == item.href ? 'selected' : ''}>
                        {item.label}
                    </a>
                </Link>
            </li>
        );
    });
};

const Sidebar = ({ isOpened, closeSidebar, router, isSafeSearch = true }) => {
    const {
        query: { page },
    } = router;

    const onSwitchSafeSearch = e => {
        closeSidebar(e);

        SetSafeSearch(!isSafeSearch);
        Router.reload();
    };

    return (
        <aside className={`sidebar${isOpened ? ' opened' : ''}`}>
            <ul>
                <RenderRoutes
                    arr={routes}
                    closeSidebar={closeSidebar}
                    page={page}
                />
                <li>
                    <button onClick={onSwitchSafeSearch}>Safe Search {isSafeSearch ?
                        (<span className='safe-search enabled'>ON</span>) :
                        (<span className='safe-search disabled'>OFF</span>)}</button>
                </li>
            </ul>
        </aside>
    );
};

export default withRouter(Sidebar);
