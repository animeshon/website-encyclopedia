import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

import styles from './AppearanceCard.module.css';

const AppearanceCard = ({ content }) => {
    const href = uri.Rewrite(content.type, content.name, content.id);

    return (
        <div key={content.name} className={styles.appearences__item}>
            <figure className={styles.appearences__item_cover}>
                <SafeImage image={content.image} />
            </figure>
            <article className={styles.appearences__item_contents}>
                <header>
                    <Link href={href}>
                        <a>
                            <h4>{content.name}</h4>
                            <h5>{content.japaneseName}</h5>
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
                    <p>{content.role}</p>
                </aside>
            </article>
        </div>
    );
};

export default AppearanceCard;