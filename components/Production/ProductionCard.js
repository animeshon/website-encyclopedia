import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';
import CollapsableSection from '@/components/CollapsableSection';

import * as uri from '@/utilities/URI';

import styles from './ProductionCard.module.css';

const ProductionCard = ({ production }) => {
    const href = uri.Rewrite(production.type, production.name, production.id);
    const order = ["typed", "free"];

    return (
        <div key={production.id} className={styles.related__item}>
            <Link href={href}>
                <a>
                    <figure className={styles.related__item_cover}>
                        <SafeImage image={production.image} />
                    </figure>
                </a>
            </Link>
            <article className={styles.related__item_contents}>
                <header>
                    <p>{production.relation}</p>
                    <Link href={href}>
                        <a>
                            <h4>{production.name}</h4>
                        </a>
                    </Link>
                    <h5>{production.japaneseName}</h5>
                    <aside>
                        <p>
                            {production.releaseDate.premiere}
                            <span>|</span>
                            {production.media}
                            <span>|</span>
                            {production.status}
                        </p>
                    </aside>
                </header>
                <aside>
                    <CollapsableSection maxHeight={50} collapsedClass={styles.collapsed} moreClass={styles.more_trigger} mainClass={styles.expandable}>
                        {order.map(o => {
                            const collaborations = production.roles[o] ? production.roles[o] : [];
                            return collaborations.map(r => {
                                return (<p key={r.id}>{r.name}</p>)
                            })
                        })}
                    </CollapsableSection>
                </aside>
            </article>
        </div>
    );
};

export default ProductionCard;