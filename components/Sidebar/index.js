import Link from 'next/link';
import { withRouter } from 'next/router';

const routes = [
    { page: 'about', label: 'About Animeshon' },
    { page: 'privacy-policy', label: 'Privacy Policy' },
    { page: 'terms-and-conditions', label: 'Terms and Conditions' },
    { page: 'contacts', label: 'Contacts' },
];

const RenderRoutes = ({ arr, closeSidebar, page }) => {
    return arr.map(item => {
        return (
            <li key={item.page} onClick={closeSidebar}>
                <Link href="/animeshon/[page]" as={`/animeshon/${item.page}`}>
                    <a className={page == item.page ? 'selected' : ''}>
                        {item.label}
                    </a>
                </Link>
            </li>
        );
    });
};

const Sidebar = ({ isOpened, closeSidebar, router }) => {
    const {
        query: { page },
    } = router;

    return (
        <aside className={`sidebar${isOpened ? ' opened' : ''}`}>
            <ul>
                <RenderRoutes
                    arr={routes}
                    closeSidebar={closeSidebar}
                    page={page}
                />
                <li>
                    <button onClick={closeSidebar}>Safe Search</button>
                </li>
            </ul>
        </aside>
    );
};

export default withRouter(Sidebar);
