import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

import styles from './RelatedCard.module.css';

const Related = ({ content }) => {
    const href = uri.Rewrite(content.type, content.name, content.id);

    return (
        <div key={content.id} className={styles.related__item}>
            <SafeImage image={content.image} className={styles.related__item_cover} />
            <article className={styles.related__item_contents}>
                <header>
                    <p>{content.relation}</p>
                    <Link href={href}>
                        <a>
                            <h4>{content.name}</h4>
                        </a>
                    </Link>
                    <p>{text.Truncate(content.description, 160)}</p>
                </header>
                <aside>
                    <p>
                        {content.season}
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

export default Related;