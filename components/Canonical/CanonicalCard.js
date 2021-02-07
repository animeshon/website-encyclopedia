import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';
import ExpandableSection from '@/components/ExpandableSection';
import ContentCard from '@/components/Card/Content/ContentCard';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

import styles from './Canonical.module.css';

const CanonicalCard = ({ item }) => {
    const href = uri.Rewrite('Canonical', item.name, item.id, item.type);

    return (
        <div key={item.id} className={styles.canonical__item}>
            <div className={styles.canonical__desc}>
                <figure className={styles.canonical__item_cover}>
                    <SafeImage image={item.image} />
                </figure>
                <article className={styles.canonical__item_contents}>
                    <header>
                        <Link href={href}>
                            <a>
                                <h4>{item.name}</h4>
                            </a>
                        </Link>
                        <p>{text.Truncate(item.description, 360)}</p>
                    </header>
                    <ExpandableSection label={"Contents"} openDefault={false} >
                        <aside className={styles["canonical__aside"]}>
                            <div className="grid-halves">
                                {[].map(c => {
                                    return (<ContentCard key={id} content={{ image, name, description, type }} />)
                                })}
                            </div>
                            <div className={styles["canonical__more-trigger"]}>
                                <button>more</button>
                            </div>
                        </aside>
                    </ExpandableSection>
                </article>
            </div>
        </div>
    );
};

export default CanonicalCard;