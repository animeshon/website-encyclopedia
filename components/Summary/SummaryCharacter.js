import React from 'react';
import Link from 'next/link';

import CharacterPreview from '@/components/Character/CharacterPreview';
import { useContainer } from '@/components/Container';

import * as uri from '@/utilities/URI';

const SummaryCharacter = ({ characters, showMore = true }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'characters');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Characters</h3>
                <span />
                {showMore && <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>}
            </header>
            {characters && characters.length ? <ul className="characters-list">
                {characters.map(item => {
                    return (<CharacterPreview key={item.id} item={item} />);
                })}
            </ul> : 'There is currently no information about characters available.'}
        </section>
    );
};

export default SummaryCharacter;