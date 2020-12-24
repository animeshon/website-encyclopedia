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
                    All data owned by Animeshon is publicly available under <Link href='https://opendatacommons.org/licenses/dbcl/1-0/'>Open Database License</Link> and <Link href='https://opendatacommons.org/licenses/dbcl/1-0/'>Database Contents License</Link>.
                </p>
                </section>
                <section>
                    <h3>Anime</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong><Link href="https://anidb.net/">AniDB</Link></strong>, <strong><Link href="https://myanimelist.net/">MyAnimeList</Link></strong>, and <strong><Link href="https://www.animenewsnetwork.com/">Anime News Network</Link></strong>.</p>
                </section>
                <section>
                    <h3>Manga, Light Novels, and Doujinshi</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong><Link href="https://www.mangaupdates.com/index.html">Baka-Updates Manga</Link></strong>, <strong><Link href="https://myanimelist.net/">MyAnimeList</Link></strong>, <strong><Link href="https://lndb.info/">The Light Novel Database</Link></strong>, <strong><Link href="https://www.doujinshi.org/">The Doujinshi &amp; Manga Lexicon</Link></strong>, and <strong><Link href="https://www.animenewsnetwork.com/">Anime News Network</Link></strong>.</p>
                </section>
                <section>
                    <h3>Visual Novels</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong><Link href="https://vndb.org/">The Visual Novel Database</Link></strong>, which is made available here under the Open Database License (ODbL).</p>
                </section>
                <section>
                    <h3>Tracks, Songs, and OSTs</h3>
                    <p>Our database might contain external content and information extracted from various different sources which might include <strong>Wikipedia</strong>, <strong><Link href="https://anidb.net/">AniDB</Link></strong>, and <strong><Link href="https://vgmdb.net/">VGMdb</Link></strong>.</p>
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

