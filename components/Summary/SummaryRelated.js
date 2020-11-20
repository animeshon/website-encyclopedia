import React from 'react';
import Link from 'next/link';
import RelatedGrid from '@/components/Related/RelatedGrid';
import { useContainer } from '@/components/Container';

import * as uri from '@/utilities/URI';

export const SUMMARY_RELATED_MAX_NUM = 4;

const SummaryRelated = ({ related }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'related');
    related = related.slice(0, SUMMARY_RELATED_MAX_NUM);

    return (
        <section className="landing-section-box">
            <header>
                <h3>Related</h3>
                <span />
                {related && related.length > SUMMARY_RELATED_MAX_NUM && (
                    <Link href={href}>
                        <a className="view-all-link">View all</a>
                    </Link>
                )}
            </header>
            <div className="related grid-halves">
                {related && related.length ?
                    <RelatedGrid related={related} />
                    : 'There is currently no related content available.'}
            </div>
        </section>
    );
};

export default SummaryRelated;