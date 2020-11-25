import React from 'react';

import CardImage from '@/components/Card/Image';
import Button from '@/components/Button';

import * as uri from '@/utilities/URI';

import Link from 'next/link';

import styles from './VoicedCard.module.css';

const Gender = (role) => {
    switch (role) {
        case "MALE":
            return "Male";
        case "FEMALE":
            return "Female";
    }

    return undefined;
};

const VoicedCard = ({ voiceActor }) => {
    return (
        <article className={styles.voice_actor}>
            <CardImage
                gender={voiceActor.gender}
                image={voiceActor.image}
                altText={voiceActor.name}
                className={""}
            />
            <div className={styles.voice_actor__descriptions}>
                <header>
                    <h4>
                        {voiceActor.name}
                    </h4>
                    {voiceActor.japaneseName && (
                        <h5> {voiceActor.japaneseName} </h5>
                    )}
                    <p>
                        {voiceActor.nationality && (<span
                            className={`fp fp-sm custom-fp ${voiceActor.nationality == 'en' ? 'gb': voiceActor.nationality}`}
                        />)}
                        {Gender(voiceActor.gender) && (
                            <h5> {Gender(voiceActor.gender)} </h5>
                        )}
                    </p>
                </header>
                <Button
                    className="cherry-red medium"
                    href={uri.Rewrite('Person', voiceActor.name, voiceActor.id)}
                    type="next-link"
                >
                    More
                    </Button>
            </div>
            <aside>
                {voiceActor.productions.map(production => {
                    return (
                        <p key={`${voiceActor.id}-${production.id}`}>
                            <Link href={uri.Rewrite(production.type, production.name, production.id)} >
                                <a>{production.name}</a>
                            </Link>
                        </p>
                    );
                })}
            </aside>
        </article>
    );
};

export default VoicedCard;