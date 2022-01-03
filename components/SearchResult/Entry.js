

import React, { useRef } from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import styles from './Entry.module.css';

const Entry = ({ item, primary }) => {
    console.log(item)
    return (
        <article className={`${styles.search_result} ${primary ? styles.primary_result : styles.secondary_result}`} >
            <Link href={item.GetURI()}>
                <div className={styles.search_result__row}>
                    {item.CoverImage() && (
                        <figure className={styles.search_result__image}>
                            <SafeImage image={item.CoverImage()} 
                                force={item.IsAdultOnly()}
                                altText={`${item.GetNames().Get()} Cover (${item.GetFullTypeString()})`} />
                        </figure>
                    )}
                    <header className={styles.search_result__texts}>
                        <div className={styles.search_result__breadcrumb}>
                            {/* {item.parent && (
                                <span>{item.parent.media}</span>
                            )}
                            {item.parent && (
                                <span>{item.parent.title}</span>
                            )} */}
                            <span>{item.GetType()}</span>
                            {item.GetSubtype() && (
                                <span>{item.GetSubtype()}</span>
                            )}
                            <span>{item.GetNames().Get()}</span>
                        </div>
                        <h2>{item.GetNames().Get()}</h2>
                        {item.GetSeason() ? (<small>{item.GetSeason()}</small>) :
                            (item.GetRunning() ? (<small>{item.GetRunning()}</small>) :
                                (item.GetReleaseDate() ? (<small>{item.GetReleaseDate()}</small>) : undefined))}
                        {item.GetEpisodeCount() ? (<p>{item.GetEpisodeCount()} episodes</p>) : undefined}
                        {item.GetChaptersCount() ? (<p>{item.GetChaptersCount()} chapters</p>) : undefined}
                        <p>{item.GetDescription(360)}</p>
                    </header>
                </div>
            </Link>
        </article>
    );
};

export default Entry;
