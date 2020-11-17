import { withRouter } from 'next/router';

// components
import Header from '@/components/Header';
import AboutAnimeshon from '@/components/_Pages/AboutAnimeshon';
import PrivacyPolicy from '@/components/_Pages/PrivacyPolicy';
import TermsAndConditions from '@/components/_Pages/TermsAndConditions';
import ContactUs from '@/components/_Pages/ContactUs';
import License from '@/components/_Pages/License';

const Page = ({ router }) => {
    const {
        query: { page },
    } = router;

    return (
        <>
            <Header isSearchAvailable={false} />
            {page == 'about' && <AboutAnimeshon />}
            {page == 'privacy-policy' && <PrivacyPolicy />}
            {page == 'terms-and-conditions' && <TermsAndConditions />}
            {page == 'contacts' && <ContactUs />}
            {page == 'license' && <License />}
        </>
    );
};

export default withRouter(Page);
