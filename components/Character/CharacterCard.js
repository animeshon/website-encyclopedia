import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Button from '@/components/Button';

import * as uri from '@/utilities/URI';

import styles from './CharacterCard.module.css';

const CharacterCard = ({ character, cast }) => {
    const href = uri.Rewrite('Character', character.name, character.id);

    return (
        <div className={styles.cast__item}>
        {/* <div className="card cast__item"> */}
            <Link href={href}>
                <a>
                    <CardImage
                        image={character.image}
                        altText={character.name}
                    />
                </a>
            </Link>

            <div className={styles.cast__item_contents}>
            {/* <div className="card__info cast__item-contents"> */}
                <header>
                    <Link href={href}>
                        <a>
                            <h4>{character.name}</h4>
                        </a>
                    </Link>
                    {character.role && (
                        <p className="card__role">{`${character.role}`}</p>
                    )}
                </header>

                {cast ? cast.map(c => {
                    const person = c.person;
                    return (<Button
                        key={`${person.id}-${character.id}`}
                        className="cherry-red medium character-button-ref"
                        type="next-link"
                        href={uri.Rewrite('Person', person.name, person.id)}
                    >
                        <span className="character-image">
                            <CardImage
                                image={person.image}
                                altText={person.name}
                                className={''}
                                gender={person.gender}
                                forceSafe={false}
                            />
                        </span>
                        {c.nationality && (<span
                            className={`fp fp-sm custom-fp ${c.nationality == 'en' ? 'gb' : c.nationality}`}
                        />)}

                        <span className="character-name">
                            {person.name}
                        </span>
                        {/* TODO Primary */}
                    </Button>)
                })
                    : null}
            </div>
        </div>
    );
};

export default CharacterCard;