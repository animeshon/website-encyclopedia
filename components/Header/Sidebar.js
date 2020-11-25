import React, { useContext, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import { UserContext } from '@/ctx/User';

import styles from './Header.module.css';

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

const Sidebar = ({ open, closeSidebar, router}) => {
    const { user, dispatchUser } = useContext(UserContext);
    const {  query: { page } } = router;
    const ref = useRef(null);

    const escapeListener = useCallback(e => {
        if (e.key === 'Escape') {
            closeSidebar(e)
        }
    }, [])
    const clickListener = useCallback( 
        e => {

            if (!(ref?.current)?.contains(e.target)) {
                closeSidebar(e);
            }
        },
        [ref.current],
    )
    useEffect(() => {
        if (open == true) {
            // Attach the listeners on component mount.
            document.addEventListener('click', clickListener)
            document.addEventListener('keyup', escapeListener)
        } else {
            document.removeEventListener('click', clickListener)
            document.removeEventListener('keyup', escapeListener)
        }

        // Detach the listeners on component unmount.
        return () => {

        }
    }, [open])

    const onSwitchSafeSearch = e => {
        closeSidebar(e);

        dispatchUser({
            type: 'setSafeSearch',
            payload: !user.safeSearch,
        })
    };

    return (
        <aside ref={ref} className={`${styles.sidebar} ${open ? styles.opened : ''}`}>
            <ul>
                <RenderRoutes
                    arr={routes}
                    closeSidebar={closeSidebar}
                    page={page}
                />
                <li>
                    <button onClick={onSwitchSafeSearch}>Safe Search {user.safeSearch ?
                        (<span className={`${styles.safe_search} ${styles.enabled}`}>ON</span>) :
                        (<span className={`${styles.safe_search} ${styles.disabled}`}>OFF</span>)}</button>
                </li>
            </ul>
        </aside>
    );
};

export default withRouter(Sidebar);
