import { withRouter } from 'next/router';
import Cookies from 'cookies';

// components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactUs from '@/components/_Pages/ContactUs';
import License from '@/components/_Pages/License';

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
    var isSafeSearch = true;
    if (ctx?.req?.headers?.cookie) {
        const cookies = new Cookies(ctx.req);
        isSafeSearch = cookies?.get('images.adult.enabled')?.toLowerCase() != "true";
    }

    return { isSafeSearch };
}

export default withRouter(Page);
