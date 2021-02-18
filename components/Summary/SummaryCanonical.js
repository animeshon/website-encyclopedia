import React from 'react';
import Link from 'next/link';

import { useContainer } from '@/components/Container';
import CanonicalPreview from '@/components/Canonical/CanonicalPreview';

import * as uri from '@/utilities/URI';

const SummaryCanonical = ({ canonicals, path = 'franchise' }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, path);

    return (
        <>
            {canonicals && canonicals.length ?
                <section className="landing-section-box">
                    <header>
                        <h3>Series</h3>
                        <span />
                        <Link href={href}>
                            <a className="view-all-link">View all</a>
                        </Link>
                    </header>
                    <ul className="adaptations-list">
                        {canonicals.map(canon => {
                            return (<CanonicalPreview key={canon.id} canon={canon} />);
                        })}
                    </ul>
                </section> : undefined}
        </>
    );
};

export default SummaryCanonical;