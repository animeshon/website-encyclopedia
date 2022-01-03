import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

import styles from './AppearanceCard.module.css';

const AppearanceCard = ({ content }) => {
    return (
        <div key={content.GetResourceName()} className={styles.appearences__item}>
            <figure className={styles.appearences__item_cover}>
                <SafeImage image={content.CoverImage()?.GetURL()} />
            </figure>
            <article className={styles.appearences__item_contents}>
                <header>
                    <p className={styles["content__item-header"]}>{content.GetRole()}</p>
                    <Link href={content.GetURI()}>
                        <a>
                            <h4>{content.GetNames().Get()}</h4>
                            {/* <h5>{content.GetNames().GetOriginal()}</h5> */}
                        </a>
                    </Link>
                    {/* <p>{content.GetDescription(80)}</p> */}
                </header>
                <aside>
                    <p>
                        {content.GetSeason() ? (content.GetSeason()) :
                            (content.GetReleaseDate() ? (content.GetReleaseDate()) : undefined)}
                        <span>|</span>
                        {content.GetType()}
                        {content.GetSubtype() ? (<><span>|</span> {content.GetSubtype()}</>) : undefined}
                        {content.GetStatus() ? (<><span>|</span> {content.GetStatus()}</>) : undefined}
                    </p>
                </aside>
            </article>
        </div>
    );
};

export default AppearanceCard;