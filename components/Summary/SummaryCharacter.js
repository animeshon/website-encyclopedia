import React from 'react';
import Link from 'next/link';

import CharacterPreview from '@/components/Character/CharacterPreview';
import { useContainer } from '@/components/Container';


const SummaryCharacter = ({ characters, showMore = true }) => {
    const container = useContainer();
    return (
        <section className="landing-section-box">
            <header>
                <h3>Characters</h3>
                <span />
                {showMore && <Link href={container.model.GetURI('characters')}>
                    <a className="view-all-link">View all</a>
                </Link>}
            </header>
            {characters && characters.Size() ? <ul className="characters-list">
                {characters.Get().map(item => {
                    return (<CharacterPreview key={item.GetResourceName()} item={item} />);
                })}
            </ul> : 'There is currently no information about characters available.'}
        </section>
    );
};

export default SummaryCharacter;