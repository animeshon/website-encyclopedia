import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

import styles from './ContentCard.module.css';

const ContentCard = ({ content }) => {
    const href = uri.Rewrite(content.type, content.name, content.id);

    return (
        <div key={content.id} className={styles.content__item}>
            <figure className={styles.content__item_cover}>
                <SafeImage image={content.image} />
            </figure>
            <article className={styles.content__item_contents}>
                <header>
                    {content.header && <p className={styles["content__item-header"]}>{content.header}</p>}
                    <Link href={href}>
                        <a>
                            <h4>{content.name}</h4>
                        </a>
                    </Link>
                    <p>{text.Truncate(content.description, 160)}</p>
                </header>
                <aside>
                    <p>
                        {content.releaseDate.premiere}
                        <span>|</span>
                        {content.media}
                        <span>|</span>
                        {content.status}
                    </p>
                </aside>
            </article>
        </div>
    );
};

export default ContentCard;