import React from 'react';
import Link from 'next/link';

import CardImage from '@/components/Card/Image';
import Button from '@/components/Button';

import * as uri from '@/utilities/URI';

const CastGender = (role) => {
    switch (role) {
        case "MALE":
            return "Male";
        case "FEMALE":
            return "Female";
    }

    return undefined;
};

const CastCard = ({ person, character, nationality }) => {
    const href = uri.Rewrite('Person', person.name, person.id);

    return (
        <div className="card">
            <Link href={href}>
                <a>
                    <CardImage
                        type='people'
                        sex={person.gender}
                        picture={person.image}
                        altText={person.name}
                    />
                </a>
            </Link>
            <div className="card__info">
                <Link href={href}>
                    <a>
                        <h4>{person.name}</h4>
                    </a>
                </Link>
                {person.japaneseName && <p className="card__jap-name">{person.japaneseName}</p>}
                <p className="card__role">
                    <span
                        className={`fp fp-sm custom-fp ${nationality}`}
                    />
                    {CastGender(person.gender)}
                </p>
                <Button
                    className="cherry-red medium character-button-ref"
                    type="next-link"
                    href={href}
                >
                    <span className="character-image">
                        <img
                            src={character.image}
                            alt={character.name}
                        />
                    </span>
                    <span className="character-name">
                        {character.name}
                    </span>
                </Button>
            </div>
        </div>
    );
};

export default CastCard;