import React from 'react';
import Link from 'next/link';

import CharacterPreview from '@/components/Character/CharacterPreview';
import { useContainer } from '@/components/Container';

import * as uri from '@/utilities/URI';

const SummaryVoiceActings = ({ characters }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'voice-actings');

    return (<>
        {characters && characters.length ? <section className="landing-section-box">
            <header>
                <h3>Main voice of</h3>
                <span />
                <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            <ul className="characters-list">
                {characters.map(item => {
                    return (<CharacterPreview key={item.id} item={item} />);
                })}
            </ul>
        </section> : undefined}
    </>);
};

export default SummaryVoiceActings;