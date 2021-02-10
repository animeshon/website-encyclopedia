import React from 'react';
import Link from 'next/link';

import { useContainer } from '@/components/Container';
import CanonicalPreview from '@/components/Canonical/CanonicalPreview';

import * as uri from '@/utilities/URI';

const SummaryUniverse = ({ universes }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'universes');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Universe</h3>
                <span />
                <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            {universes.length ? (<ul className="adaptations-list">
                {universes.map(canon => {
                    return (
                        <CanonicalPreview key={canon.id} canon={canon} />
                    )
                })}
            </ul>) : "This Serie is not part of any Universe."}
        </section>
    );
};

export default SummaryUniverse;