import React, { useState, useEffect, useRef } from 'react';

import CardImage from '@/components/Card/Image';
import Flag from '@/components/Flag';

import * as uri from '@/utilities/URI';
import { Gender } from '@/utilities/Gender';
import * as media from '@/utilities/MediaType';

import Link from 'next/link';

import styles from './VoicedCard.module.css';

// TODO divide production in different types

const VoicedCard = ({ subject }) => {
    const [expanded, setExpanded] = useState(false);
    const [height, setHeight] = useState(0)
    const ref = useRef(null)

    const expand = (flag) => {
        if (flag) {
            ref.current.classList.remove(styles.collapsed);
        } else {
            ref.current.classList.add(styles.collapsed);
        }
        setExpanded(flag);
    };

    function handleExpand(e) {
        e.preventDefault();
        expand(!expanded);
    }

    useEffect(() => {
        setHeight(ref.current.clientHeight);
        if (ref.current.clientHeight > 176) {
            expand(false);
        }
    }, []);

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
                        <Flag nationality={subject.nationality}/>
                        {Gender(subject.gender) && (
                            <h5> {Gender(subject.gender)} </h5>
                        )}
                    </p>
                </header>
            </div>
            <aside>
                <div ref={ref} className={styles.expandable}>
                    {subject.productions.map(production => {
                        return (
                            <p key={`${subject.id}-${production.id}`}>
                                <Link href={uri.Rewrite(production.type, production.name, production.id)} >
                                    <a>{production.name}</a>
                                </Link>
                            </p>
                        );
                    })}
                </div>

                {height > 176 ? <div className={styles.more_trigger}>
                    <p onClick={handleExpand}>{expanded ? 'less...' : 'more...'}</p>
                </div> : undefined}
            </aside>
        </article>
    );
};

export default VoicedCard;