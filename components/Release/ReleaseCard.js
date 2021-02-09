import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';
import * as platforms from '@/utilities/Platform';

import SafeImage from '@/components/SafeImage';
import { PremiereAny } from '@/utilities/Premiere';

import styles from './ReleaseCard.module.css';
import Flag from '@/components/Flag';

const ReleaseCard = ({ release }) => {
    const href = uri.Rewrite(release.type, release.name, release.id);
    const premiere = PremiereAny(release.releaseDate, undefined)

    return (
        <div key={release.id} className={styles["release-details__item"]}>
            <figure>
                <SafeImage image={release.image} />
            </figure>
            <div className={styles["release-details"]}>
                <Link href={href}>
                    <a>
                        <h4>{release.name}</h4>
                    </a>
                </Link>
                <article>
                    <div className={styles.justified}>
                        <header>
                            <p>{text.Truncate(release.description, 160)}</p>
                        </header>
                    </div>
                    <div className={styles.justified}>
                        <header>
                            <p className={styles["strong"]}>Available on</p>
                            <p>{release.platforms.map(m => platforms.Platform(m).name).join(", ")}</p>
                        </header>
                        <aside>
                            <p>
                                {premiere ? premiere : "Unknown release date"}
                                {release.languages.length != 0 ?
                                    <>
                                        <span>|</span>
                                        {release.languages.map((l, i) => {
                                            return <Flag key={JSON.stringify([l, i])}nationality={l.code} className={styles["release-lang"]} />
                                        })}
                                        
                                    </>
                                    : undefined}

                                <span>|</span>
                                {release.isOfficial ? "Official" : "Doujinshi"}

                                {release.releaseType ?
                                    <>
                                        <span>|</span>
                                        {release.releaseType.label}
                                    </>
                                    : undefined}

                                {release.rating ?
                                    <>
                                        <span>|</span>
                                        {release.rating}
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