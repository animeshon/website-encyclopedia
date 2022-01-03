import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Button from '@/components/Button';
import Flag from '@/components/Flag';

import styles from './CharacterCard.module.css';

const CharacterCard = ({ character, language }) => {
    return (
        <div className={styles.cast__item}>
            <Link href={character.GetURI()}>
                <a>
                    <CardImage
                        image={character.CoverImage()?.GetURL()}
                        altText={character.GetNames().Get()}
                    />
                </a>
            </Link>

            <div className={styles.cast__item_contents}>
                <header>
                    <Link href={character.GetURI()}>
                        <a>
                            <h4>{character.GetNames().Get()}</h4>
                        </a>
                    </Link>
                    {character.GetRole() && (
                        <p className="card__role">{`${character.GetRole()}`}</p>
                    )}
                </header>

                {character.GetSeyuus(language).map(s => {
                    return (<Button
                        key={`${s.GetResourceName()}-${character.GetResourceName()}-${language}`}
                        className="cherry-red medium character-button-ref"
                        type="next-link"
                        href={s.GetURI()}
                    >
                        <span className="character-image">
                            <CardImage
                                image={s.CoverImage()?.GetURL()}
                                altText={s.GetNames().Get()}
                                className={''}
                                gender={s.GetGender()}
                                forceSafe={false}
                            />
                        </span>
                        <Flag nationality={s.GetLocalization().GetCountry().alpha2 ?? s.GetLocalization().GetLanguage().alpha2} />

                        <span className="character-name">
                            {s.GetNames().Get()}
                        </span>
                        {/* TODO Primary */}
                    </Button>)
                })}
            </div>
        </div>
    );
};

export default CharacterCard;