import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';
import CollapsableSection from '@/components/CollapsableSection';

import styles from './ProductionCard.module.css';

const ProductionCard = ({ production }) => {
    const order = ["typed", "free"];

    return (
        <div key={production.id} className={styles.related__item}>
            <Link href={production.GetURI()}>
                <a>
                    <figure className={styles.related__item_cover}>
                        <SafeImage image={production.CoverImage()?.GetURL()} />
                    </figure>
                </a>
            </Link>
            <article className={styles.related__item_contents}>
                <header>
                    {/* <p>{production.relation}</p> */}
                    <Link href={production.GetURI()}>
                        <a>
                            <h4>{production.GetNames().Get()}</h4>
                        </a>
                    </Link>
                    <h5>{production.GetNames().GetOriginal()}</h5>
                    <aside>
                        <p>
                            {production.GetSeason() ? (production.GetSeason()) :
                                (production.GetReleaseDate() ? (production.GetReleaseDate()) : undefined)}
                            <span>|</span>
                            {production.GetType()}
                            {production.GetSubtype() ? (<><span>|</span> {production.GetSubtype()}</>) : undefined}
                            {production.GetStatus() ? (<><span>|</span> {production.GetStatus()}</>) : undefined}
                        </p>
                    </aside>
                </header>
                <aside>
                    {/* TODO: Handle freeetext jobrole */}
                    <CollapsableSection maxHeight={50} collapsedClass={styles.collapsed} moreClass={styles.more_trigger} mainClass={styles.expandable}>
                        {production.Roles().map(o => {
                                return (<p key={[production.GetResourceName(), o]}>{o.GetJobRole()}</p>)
                        })}
                    </CollapsableSection>
                </aside>
            </article>
        </div>
    );
};

export default ProductionCard;