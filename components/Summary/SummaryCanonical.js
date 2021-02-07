import React from 'react';
import Link from 'next/link';

import { useContainer } from '@/components/Container';
import CanonicalPreview from '@/components/Canonical/CanonicalPreview';

import * as uri from '@/utilities/URI';

const SummaryCanonical = ({ canonicals }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'franchise');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Canonical Franchise</h3>
                <span />
                <Link href={href}>
                        <a className="view-all-link">View all</a>
                    </Link>
            </header>
            {canonicals && canonicals.length ? <ul className="adaptations-list">
                {canonicals.map(item => {
                    return (<CanonicalPreview key={item.id} item={item} />);
                })}
            </ul> : 'There is currently no information about canonical franchise available.'}
        </section>
    );
};

export default SummaryCanonical;