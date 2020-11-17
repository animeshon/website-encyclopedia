import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Button from '@/components/Button';

import * as uri from '@/utilities/URI';

export const CharacterRole = (role) => {
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

const CharacterCard = ({ character }) => {
    const href = uri.Rewrite('Character', character.name, character.id);

    return (
        <div className="card">
            <Link href={href}>
                <a>
                    <CardImage
                        type='character'
                        picture={character.image}
                        altText={character.name}
                    />
                </a>
            </Link>

            <div className="card__info">
                <Link href={href}>
                    <a>
                        <h4>{character.name}</h4>
                    </a>
                </Link>
                {character.japaneseName && (
                    <p className="card__jap-name">{character.japaneseName}</p>
                )}
                {CharacterRole(character.role) && (
                    <p className="card__role">{`${CharacterRole(character.role)}`}</p>
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