import React from 'react';
import Link from 'next/link';

import CharacterPreview from '@/components/CharacterPreview';
import { useContainer } from '@/components/Container';

import * as uri from '@/utilities/URI';

const SummaryCharacter = ({ characters }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'characters');

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