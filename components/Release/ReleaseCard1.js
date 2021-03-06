import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';
import { PremiereAny } from '@/utilities/Premiere';
import { AgeRating } from '@/utilities/AgeRating';

import SafeImage from '@/components/SafeImage';

import styles from './ReleaseCard.module.css';
import Flag from '@/components/Flag';

const ReleaseCard = ({ release }) => {
    const href = uri.Rewrite(release.type, release.name, release.id);
    const releaseDate = PremiereAny(release.releaseDate, undefined);
    const ageRating = AgeRating(release.ageRatings, ['USA']);

    return (
        <div key={release.id} className={styles["release-details__item"]}>
            <figure>
                <SafeImage image={undefined} />
            </figure>
            <article className={styles["release-details"]}>
                <header>
                    <Link href={href}>
                        <a>
                            <h4>{release.name}</h4>
                        </a>
                    </Link>
                    {/* <p>{text.Truncate(release.description, 160)}</p> */}

                    <p className={styles["strong"]}>Available on</p>
                    <p>{release.platform.join(", ")}</p>
                </header>
                <aside>
                    <p>
                    <Flag nationality={release.lang} className={styles["release-lang"]} />
                    <span>|</span>
                    { releaseDate }
                    <span>|</span>
                    { release.doujinshi ? "Doujinshi" : "Official" }
                    <span>|</span>
                    { release.releaseType }
                    <span>|</span>
                    { ageRating }
                </p>
                </aside>
            </article>
        </div>
    );
};

export default ReleaseCard;