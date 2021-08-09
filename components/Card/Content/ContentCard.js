import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import styles from './ContentCard.module.css';

const ContentCard = ({ content }) => {
    return (
        <div key={content.model.GetID()} className={styles.content__item}>
            <figure className={styles.content__item_cover}>
                <SafeImage image={content.model.GetCoverUrl()} />
            </figure>
            <article className={styles.content__item_contents}>
                <header>
                    {content.header && <p className={styles["content__item-header"]}>{content.header}</p>}
                    <Link href={content.model.GetURI()}>
                        <a>
                            <h4>{content.model.GetNames().Get()}</h4>
                        </a>
                    </Link>
                    <p>{content.model.GetDescription(160)}</p>
                </header>
                <aside>
                    <p>
                        {content.model.GetSeason() ? (content.model.GetSeason()) :
                            (content.model.GetReleaseDate() ? (content.model.GetReleaseDate()) : undefined)}
                        <span>|</span>
                        {content.model.GetType()}
                        {content.model.GetSubtype() ? (<><span>|</span> {content.model.GetSubtype()}</>) : undefined}
                        {content.model.GetStatus() ? (<><span>|</span> {content.model.GetStatus()}</>) : undefined}
                    </p>
                </aside>
            </article>
        </div>
    );
};

export default ContentCard;