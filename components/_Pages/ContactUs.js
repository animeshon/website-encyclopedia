import Link from "next/link";
import Head from 'next/head';

const Website = process.env.NEXT_PUBLIC_WEBSITE_NAME || 'Animeshon';
const Page = 'Contacts';

const ContactUs = () => {
    return (
        <div>
            <Head>
                <title>{Page} - {Website}</title>
            </Head>
            <div className="text-container">
                <h1>Contacts</h1>
                <section>
                    <p>
                        This page will provide you with a short list of contacts that you might find useful.
                </p>
                </section>
                <section>
                    <h3>Social</h3>
                    <p>We are available for community-related topics through our social pages: <strong><Link href='https://twitter.com/AnimeshonSNS'>Twitter</Link></strong> and <strong><Link href='https://www.reddit.com/r/animeshon'>Reddit</Link></strong>.</p>
                </section>
                <section>
                    <h3>Technical</h3>
                    <p>For technical inquires please get in touch with us through our official <strong><Link href='https://discuss.animeshon.com'>Discourse</Link></strong> or <strong><Link href='https://github.com/animeshon'>GitHub</Link></strong>.</p>
                </section>
                <section>
                    <h3>General</h3>
                    <p>For general inquires please get in touch with us through our email address <strong>info@animeshon.com</strong>.</p>
                </section>
                <section>
                    <h3>Privacy</h3>
                    <p>For privacy-related inquires please get in touch with us through our email address <strong>privacy@animeshon.com</strong>.</p>
                </section>
                <section>
                    <h3>Legal</h3>
                    <p>For legal-related inquires please get in touch with us through our email address <strong>legal@animeshon.com</strong>.</p>
                </section>
            </div>
        </div>
    );
};

export default ContactUs;
