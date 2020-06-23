import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Search = () => {
    return (
        <>
            <Header isSearchAvailable />
            <em className="results-displayer">
                Results displayed in 0.4 seconds
            </em>
            <div className="results-container">
                <div className="left-column">
                    <article className="search-result anime primary-result">
                        <div className="search-result__row">
                            <section className="search-result__contents">
                                <figure className="search-result__image">
                                    <img
                                        src="https://cdn.animesaturn.com/static/images/locandine/17405l.jpg"
                                        alt="Naruto (Anime)"
                                    />
                                </figure>
                                <header className="search-result__texts">
                                    <div className="search-result__breadcrumb">
                                        <span>Naruto</span>
                                        <span>Anime</span>
                                        <span>Naruto</span>
                                    </div>
                                    <h2>Naruto (Anime)</h2>
                                    <strong>Anime</strong>
                                    <p>
                                        Naruto is an anime series based on
                                        Masashi Kishimoto’s manga series of the
                                        same name. The series centers on the
                                        adventures of Naruto Uzumaki, a young
                                        ninja of Konohagakure, searching for
                                        recognitions and wishing …
                                    </p>
                                </header>
                            </section>
                        </div>
                        <aside className="search-result__aside">
                            <h3>Episodes</h3>
                            <div className="search-result__column">
                                <div className="search-result__aside__item">
                                    <figure>
                                        <img
                                            src="https://fanaru.com/naruto-shippuuden/image/279686-naruto-shippuuden-naruto-uzumaki-episode-screencap-22x21.jpg"
                                            alt=""
                                        />
                                    </figure>
                                    <div className="search-result__aside__texts">
                                        <h4>Enter: Naruto Uzumaki!</h4>
                                        <p>
                                            Sanjou! Uzumaki Naruto (参上!
                                            うずまきナルト)
                                        </p>
                                    </div>
                                </div>
                                <div className="search-result__aside__item">
                                    <figure>
                                        <img
                                            src="https://fanaru.com/naruto-shippuuden/image/276664-naruto-shippuuden-the-valley-of-the-end-episode-screencap-22x17.jpg"
                                            alt=""
                                        />
                                    </figure>
                                    <div className="search-result__aside__texts">
                                        <h4>Enter: Naruto Uzumaki!</h4>
                                        <p>
                                            Sanjou! Uzumaki Naruto (参上!
                                            うずまきナルト)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="search-result__more-trigger">
                                <button>more</button>
                            </div>
                        </aside>
                    </article>
                    {/* ---------------------------------------- */}
                    <article className="search-result manga primary-result">
                        <div className="search-result__row">
                            <section className="search-result__contents">
                                <figure className="search-result__image">
                                    <img
                                        src="https://879ed873-madman-com-au.akamaized.net/media/Releases/33400/33400-1060806.jpg"
                                        alt="Naruto (Manga Series)"
                                    />
                                </figure>
                                <header className="search-result__texts">
                                    <div className="search-result__breadcrumb">
                                        <span>Naruto</span>
                                        <span>Manga</span>
                                        <span>Naruto</span>
                                    </div>
                                    <h2>Naruto (Manga Series)</h2>
                                    <strong>Manga Series</strong>
                                    <p>
                                        Naruto is an anime series based on
                                        Masashi Kishimoto’s manga series of the
                                        same name. The series centers on the
                                        adventures of Naruto Uzumaki, a young
                                        ninja of Konohagakure, searching for
                                        recognitions and wishing …
                                    </p>
                                </header>
                            </section>
                        </div>
                        <aside className="search-result__aside">
                            <h3>Volumes</h3>
                            <div className="search-result__column">
                                <div className="search-result__aside__item">
                                    <figure>
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg"
                                            alt="Naruto Volume 1"
                                        />
                                    </figure>
                                    <div className="search-result__aside__texts">
                                        <h4>Volume 1</h4>
                                        <p>
                                            Twelve years ago the Village Hidden
                                            in the Leaves was attacked…
                                        </p>
                                    </div>
                                </div>
                                <div className="search-result__aside__item">
                                    <figure>
                                        <img
                                            src="https://m.media-amazon.com/images/I/61IH90LyydL.jpg"
                                            alt="Naruto Volume 2"
                                        />
                                    </figure>
                                    <div className="search-result__aside__texts">
                                        <h4>Volume 2</h4>
                                        <p>
                                            Tired of menial tasks, Naruto,
                                            Sasuke and Sakura ask for a tougher
                                            assignment…
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="search-result__more-trigger">
                                <button>more</button>
                            </div>
                        </aside>
                    </article>
                    {/* ---------------------------------------------- */}
                    <article className="search-result organization secondary-result">
                        <div className="search-result__row">
                            <section className="search-result__contents">
                                <figure className="search-result__image">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/TV_Tokyo_logo_20110629.svg/1200px-TV_Tokyo_logo_20110629.svg.png"
                                        alt="TV Tokio"
                                    />
                                </figure>
                                <header className="search-result__texts">
                                    <div className="search-result__breadcrumb">
                                        <span>Organizations</span>
                                        <span>TV Tokyo</span>
                                    </div>
                                    <h2>TV Tokyo</h2>
                                    <strong>Organization</strong>
                                    <p>
                                        JOTX-DTV, branded as TV Tokyo
                                        (テレビ東京, Terebi Tōkyō) and often
                                        abbreviated as “Teleto” (テレ東,
                                        Teretō), a blend of “terebi” and
                                        “Tokyo”, is the flagship station of the
                                        TXN Network headquartered in the
                                        Sumitomo Fudosan Roppongi Grand…
                                    </p>
                                </header>
                            </section>
                        </div>
                    </article>
                    {/* ---------------------------------------------- */}
                    <article className="search-result game secondary-result">
                        <div className="search-result__row">
                            <section className="search-result__contents">
                                <figure className="search-result__image">
                                    <img
                                        src="https://images-na.ssl-images-amazon.com/images/I/81NEQyruZjL._SY445_.jpg"
                                        alt="Naruto: Clash of Ninja"
                                    />
                                </figure>
                                <header className="search-result__texts">
                                    <div className="search-result__breadcrumb">
                                        <span>Games</span>
                                        <span>Naruto: Clash of Ninja</span>
                                    </div>
                                    <h2>Naruto: Clash of Ninja</h2>
                                    <strong>Manga Series</strong>
                                    <p>
                                        Naruto is an anime series based on
                                        Masashi Kishimoto’s manga series of the
                                        same name. The series centers on the
                                        adventures of Naruto Uzumaki, a young
                                        ninja of Konohagakure, searching for
                                        recognitions and wishing …
                                    </p>
                                </header>
                            </section>
                        </div>
                    </article>
                    {/* ---------------------------------------------- */}
                    <article className="search-result people secondary-result">
                        <div className="search-result__row">
                            <section className="search-result__contents">
                                <figure className="search-result__image">
                                    <img
                                        src="https://image.tmdb.org/t/p/w235_and_h235_face/7SQSXY0hbloZ9MUznMk1pBxQq1V.jpg"
                                        alt="Hayato Date"
                                    />
                                </figure>
                                <header className="search-result__texts">
                                    <div className="search-result__breadcrumb">
                                        <span>People</span>
                                        <span>Hayato Date</span>
                                    </div>
                                    <h2>Hayato Date</h2>
                                    <strong>Director</strong>
                                    <p>
                                        Hayato Date (伊達勇登, Date Hayato, born
                                        May 22, 1962) is a Japanese animation
                                        film and television director.
                                    </p>
                                </header>
                            </section>
                        </div>
                    </article>
                </div>
                <div className="right-column">right</div>
            </div>
            <Footer contextualClass="search-footer" />
        </>
    );
};

export default Search;
