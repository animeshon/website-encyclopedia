import React from 'react';

import CardImage from '@/components/Card/Image';
import Flag from '@/components/Flag';
import CollapsableSection from '@/components/CollapsableSection';

import Link from 'next/link';

import styles from './VoicedCard.module.css';

// TODO divide production in different types

const VoicedCard = ({ subject }) => {
    return (
        <article className={styles.voice_card}>
            {subject.Type() != "voiceover" ? <Link href={subject.GetURI()}>
                <a>
                    <CardImage
                        gender={subject.Gender()}
                        image={subject.GetCoverUrl()}
                        altText={subject.GetNames().Get()}
                        className={""}
                    />
                </a>
            </Link> : <CardImage
                gender={subject.Gender()}
                image={subject.GetCoverUrl()}
                altText={subject.GetNames().Get()}
                className={""}
            />}
            <div className={styles.voice_card__descriptions}>
                <header>
                    {subject.Type() != "voiceover" ? <Link href={subject.Type() != "voiceover" ? subject.GetURI() : undefined}>
                        <a>
                            <h4>{subject.GetNames().Get()}</h4>
                        </a>
                    </Link> : <h4>{subject.GetNames().Get()}</h4>}
                    <h5> {subject.GetNames().GetOriginal()} </h5>
                    {subject.Type() && (
                        <b> {subject.GetType()} </b>
                    )}
                    <p>
                        <Flag nationality={subject.GetLocalization().GetCountry().alpha2 ?? subject.GetLocalization().GetLanguage().alpha2} />
                        {subject.Gender() && (
                            <h5> {subject.GetGender()} </h5>
                        )}
                    </p>
                </header>
            </div>
            <aside>
                <CollapsableSection maxHeight={176} collapsedClass={styles.collapsed} moreClass={styles.more_trigger} mainClass={styles.expandable}>
                    {subject.Audibles().map(production => {
                        return (
                            <p key={`${subject.GetID()}-${production.GetID()}`}>
                                <Link href={production.GetURI()} >
                                    <a>{production.GetNames().Get()}</a>
                                </Link> | {production.GetFullTypeString()} | {production.GetSeason() ? (production.GetSeason()) :
                                    (production.GetReleaseDate() ? (production.GetReleaseDate()) : undefined)}
                            </p>
                        );
                    })}
                </CollapsableSection>
            </aside>
        </article>
    );
};

export default VoicedCard;