import React from 'react';

import CardImage from '@/components/Card/Image';
import Flag from '@/components/Flag';
import CollapsableSection from '@/components/CollapsableSection';

import * as uri from '@/utilities/URI';
import { Gender } from '@/utilities/Gender';
import * as media from '@/utilities/MediaType';

import Link from 'next/link';

import styles from './VoicedCard.module.css';

// TODO divide production in different types

const VoicedCard = ({ subject }) => {
    const hrefSubject = uri.Rewrite(subject.type, subject.name, subject.id);

    return (
        <article className={styles.voice_card}>
            <Link href={subject.type != "VoiceOver" ? hrefSubject : undefined}>
                <a>
                    <CardImage
                        gender={subject.gender}
                        image={subject.image}
                        altText={subject.name}
                        className={""}
                    />
                </a>
            </Link>
            <div className={styles.voice_card__descriptions}>
                <header>
                    <Link href={subject.type != "VoiceOver" ? hrefSubject : undefined}>
                        <a>
                            <h4>{subject.name}</h4>
                        </a>
                    </Link>
                    {subject.japaneseName && (
                        <h5> {subject.japaneseName} </h5>
                    )}
                    {subject.type && (
                        <b> {media.Type(subject.type)} </b>
                    )}
                    <p>
                        <Flag nationality={subject.nationality} />
                        {Gender(subject.gender) && (
                            <h5> {Gender(subject.gender)} </h5>
                        )}
                    </p>
                </header>
            </div>
            <aside>
                <CollapsableSection maxHeight={176} collapsedClass={styles.collapsed} moreClass={styles.more_trigger} mainClass={styles.expandable}>
                    {subject.productions.map(production => {
                        return (
                            <p key={`${subject.id}-${production.id}`}>
                                <Link href={uri.Rewrite(production.type, production.name, production.id)} >
                                    <a>{production.name}</a>
                                </Link>
                            </p>
                        );
                    })}
                </CollapsableSection>
            </aside>
        </article>
    );
};

export default VoicedCard;