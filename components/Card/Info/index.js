import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Flag from '@/components/Flag';

import * as uri from '@/utilities/URI';
import * as media from '@/utilities/MediaType';

import styles from './CardInfo.module.css';

const CardInfo = ({ info }) => {
    const href = uri.Rewrite(info.type, info.name, info.id);

    return (
        <div key={info.id} className={styles.card}>
            <Link href={href}>
                <a>
                    <CardImage
                        image={info.image}
                        gender={info.gender}
                        altText={`${info.name}`}
                        className={styles.card__image}
                    />
                </a>
            </Link>
            <div className={styles.card__info}>
                <div>
                    <Link href={href}>
                        <a>
                            <h4>
                                {info.name}
                            </h4>
                        </a>
                    </Link>

                    {info.japaneseName &&
                        <p>{info.japaneseName}</p>}
                </div>
                {info.type && (
                    <b> {media.Type(info.type)} </b>
                )}
                <Flag nationality={info.nationality}/>


                {info.caption &&
                    <p className={styles.card__role}>{info.caption}</p>}
            </div>
        </div>
    );
};

export default CardInfo;
