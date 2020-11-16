import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Button from '@/components/Button';

import * as uri from 'utilities/URI';

const CharacterRole = (role) => {
    switch (role) {
        case "MAIN":
            return "Main Character";
        case "SUPPORT":
            return "Support Character";
        case "APPEARS":
            return "Appearance";
    }

    return undefined;
};

const CharacterCard = ({ item }) => {
    const href = uri.Rewrite('Character', item.name, item.id);

    return (
        <div className="card">
            <Link href={href}>
                <a>
                    <CardImage
                        type='character'
                        picture={item.image}
                        altText={item.name}
                    />
                </a>
            </Link>

            <div className="card__info">
                <Link href={href}>
                    <a>
                        <h4>{item.name}</h4>
                    </a>
                </Link>
                {item.japaneseName && (
                    <p className="card__jap-name">{item.japaneseName}</p>
                )}
                {CharacterRole(item.role) && (
                    <p className="card__role">{`${CharacterRole(item.role)}`}</p>
                )}
                <Button
                    className="cherry-red medium"
                    type="next-link"
                    href={href}
                >
                    More
                    </Button>
            </div>
        </div>
    );
};


export default CharacterCard;