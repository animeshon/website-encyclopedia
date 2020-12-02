

import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import { Rewrite } from '@/utilities/URI';

import styles from './Entry.module.css';

const Entry = ({ item, primary }) => {
    const itemHref = Rewrite(item.type, item.title, item.id)
    return (
        <article className={`${styles.search_result} ${primary ? styles.primary_result : styles.secondary_result}`} >
            <Link href={itemHref}>
                <div className={styles.search_result__row}>
                    {item.image && (
                        <SafeImage image={item.image} altText={`${item.title} Cover (${item.media})`} className={styles.search_result__image} />
                    )}
                    <header className={styles.search_result__texts}>
                        <div className={styles.search_result__breadcrumb}>
                            {item.parent && (
                                <span>{item.parent.media}</span>
                            )}
                            {item.parent && (
                                <span>{item.parent.title}</span>
                            )}
                            <span>{item.media}</span>
                            <span>{item.title}</span>
                        </div>
                        <h2>{item.title}</h2>
                        {item.subtype && (<strong>{item.subtype}</strong>)}
                        {item.premiere && (<small>{item.premiere}</small>)}
                        <p>{item.description}</p>
                    </header>
                </div>
            </Link>
        </article>
    );
};

export default Entry;
