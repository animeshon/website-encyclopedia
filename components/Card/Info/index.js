import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Flag from '@/components/Flag';


import styles from './CardInfo.module.css';

const CardInfo = ({ info, caption }) => {
    return (
        <div className={styles.card}>
            <Link href={info.GetURI()}>
                <a>
                    <CardImage
                        image={info.CoverImage()?.GetURL()}
                        gender={info.GetGender()}
                        altText={`${info.GetNames().Get()}`}
                        className={styles.card__image}
                    />
                </a>
            </Link>
            <div className={styles.card__info}>
                <div>
                    <Link href={info.GetURI()}>
                        <a>
                            <h4>
                                {info.GetNames().Get()}
                            </h4>
                        </a>
                    </Link>

                    {info.GetNames().GetOriginal() &&
                        <p>{info.GetNames().GetOriginal()}</p>}
                </div>
                {info.GetType() && (
                    <b> {info.GetType()} </b>
                )}
                <Flag nationality={info.GetLocalization().GetCountry().alpha2 ?? info.GetLocalization().GetLanguage().alpha2} />

                {caption &&
                    <p className={styles.card__role}>{caption}</p>}
            </div>
        </div>
    );
};

export default CardInfo;
