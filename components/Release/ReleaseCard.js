import React from 'react';
import Link from 'next/link';

import { FromAlpha2 } from '@/utilities/Nationality';

import SafeImage from '@/components/SafeImage';

import styles from './ReleaseCard.module.css';
import Flag from '@/components/Flag';

const ReleaseCard = ({ release }) => {
    return (
        <div key={release.id} className={styles["release-details__item"]}>
            <figure>
                <SafeImage image={release.CoverImage()?.GetURL()} />
            </figure>
            <div className={styles["release-details"]}>
                <Link href={release.GetURI()}>
                    <a>
                        <h4>{release.GetNames().Get()}</h4>
                    </a>
                </Link>
                <article>
                    <div className={styles.justified}>
                        <header>
                            <p>{release.GetDescription(160)}</p>
                        </header>
                    </div>
                    <div className={styles.justified}>
                        <header>
                            <p className={styles["strong"]}>Available on</p>
                            <p>{release.LocalizedPlatforms().join(", ")}</p>
                        </header>
                        <aside>
                            <p>
                                {release.GetReleaseDate() ? release.GetReleaseDate() : "Unknown release date"}
                                {release.Languages().map((l, i) => (<>
                                    <span>|</span>
                                    <Flag nationality={FromAlpha2([l.alpha2])[0].code} className={styles["release-lang"]} />
                                </>))}

                                <span>|</span>
                                {release.Independent() ? "Self Published" : "Official"}

                                {release.Subtype() ?
                                    <>
                                        <span>|</span>
                                        {release.GetSubtype()}
                                    </>
                                    : undefined}
                            </p>
                        </aside>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default ReleaseCard;