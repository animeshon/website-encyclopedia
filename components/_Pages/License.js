import Link from "next/link";
import Head from 'next/head';

const Website = process.env.NEXT_PUBLIC_WEBSITE_NAME || 'Animeshon Encyclopedia';
const Page = 'License';

const License = () => {
    return (
        <div>
            <Head>
                <title>{Page} - {Website}</title>
            </Head>
            <div className="text-container">
                <h1>License</h1>
                <section>
                    <p>
                        This page lists all licenses and external work used throught our encyclopedia.<br /><br />
                    Please note that information available within our database is the result of an extensive work of data pre-processing (both automated and manual) and cross-referencing of existing records available among multiple different and publicly available sources.<br />
                    All data owned by Animeshon is publicly available under <Link href='https://opendatacommons.org/licenses/dbcl/1-0/'>Open Database License</Link> and <Link href='https://opendatacommons.org/licenses/dbcl/1-0/'>Database Contents License</Link>.<br /><br />
                    Finally, please note that all data available on this website is not coming from single sources (i.e. copycat database) but is a comprehensive database of all information shared by the community on a global scale and from different reliable data providers.
                </p>
                </section>
                <section>
                    <h3>Anime</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong>AniDB</strong>, <strong>MyAnimeList</strong>, and <strong>Anime News Network</strong>.</p>
                </section>
                <section>
                    <h3>Manga, Light Novels, and Doujinshi</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong>Baka-Updates Manga</strong>, <strong>MyAnimeList</strong>, <strong>The Light Novel Database</strong>, <strong>The Doujinshi &amp; Manga Lexicon</strong>, and <strong>Anime News Network</strong>.</p>
                </section>
                <section>
                    <h3>Visual Novels</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong>The Visual Novel Database</strong>, which is made available here under the Open Database License (ODbL).</p>
                </section>
                <section>
                    <h3>Tracks, Songs, and OSTs</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong>AniDB</strong>, and <strong>VGMdb</strong>.</p>
                </section>
                <br />
                <section>
                    <h2>Takedown Notices</h2>
                    <p>For any takedown request related to data or content hosted on our service please send an email to <strong>legal@animeshon.com</strong>.</p>
                </section>
            </div>
        </div>
    );
};

export default License;

