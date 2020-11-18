import { withRouter } from 'next/router';

// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactUs from '@/components/_Pages/ContactUs';
import License from '@/components/_Pages/License';

import { SafeSearch } from '@/utilities/SafeSearch';

const Page = ({ router, isSafeSearch }) => {
    const {
        query: { page },
    } = router;

    return (
        <>
            <Header isSearchAvailable={false} isSafeSearch={isSafeSearch} />
            {page == 'contacts' && <ContactUs />}
            {page == 'license' && <License />}
            {/* <Footer /> */}
        </>
    );
};

Page.getInitialProps = async ctx => {
    return { isSafeSearch: SafeSearch(ctx) };
}

export default withRouter(Page);
