import { withRouter } from 'next/router';

// components
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import ContactUs from '@/components/_Pages/ContactUs';
import License from '@/components/_Pages/License';

const Page = ({ router }) => {
    const {
        query: { page },
    } = router;

    return (
        <>
            <Header isSearchAvailable={false} />
            <div className="header_padder"/>
            {page == 'contacts' && <ContactUs />}
            {page == 'license' && <License />}
            {/* <Footer /> */}
        </>
    );
};

export default withRouter(Page);
