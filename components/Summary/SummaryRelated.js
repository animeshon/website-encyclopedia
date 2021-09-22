import React from 'react';
import Link from 'next/link';
import RelatedGrid from '@/components/Related/RelatedGrid';
import { useContainer } from '@/components/Container';

export const SUMMARY_RELATED_MAX_NUM = 4;

const SummaryRelated = ({ related }) => {
    const container = useContainer();

    return (
        <section className="landing-section-box">
            <header>
                <h3>Related</h3>
                <span />
                <Link href={container.model.GetURI('related')}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            <div className="related grid-halves">
                {related.Size() ?
                    <RelatedGrid related={related} max={SUMMARY_RELATED_MAX_NUM} />
                    : 'There is currently no related content available.'}
            </div>
        </section>
    );
};

export default SummaryRelated;