import React from 'react';
import Link from 'next/link';

import CharacterPreview from '@/components/CharacterPreview';

import * as uri from '@/utilities/URI';

const SummaryCharacter = ({ type, title, id, characters }) => {
    const href = uri.Rewrite(type, title, id, 'characters');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Characters</h3>
                <span />
                <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            <ul className="characters-list">
                {characters && characters.length ? characters.map(item => {
                    return (<CharacterPreview key={item.id} item={item} />);
                }) : 'There is currently no information about characters available.'}
            </ul>
        </section>
    );
};

export default SummaryCharacter;