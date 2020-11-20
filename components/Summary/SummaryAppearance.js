import React from 'react';
import Link from 'next/link';
import AppearanceCard from '@/components/AppearanceCard';
import * as uri from '@/utilities/URI';

import { useContainer } from '@/components/Container';
import { PruneInvalidAppearances } from '@/components/AppearanceGrid';

export const SUMMARY_APPEARANCES_MAX_NUM = 6;

const SummaryAppearance = ({ appearances }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'appearances');

    const valid = PruneInvalidAppearances(appearances);

    return (
        <section className="landing-section-box">
            <header>
                <h3>Appearances</h3>
                <span />
                {appearances && appearances.length > SUMMARY_APPEARANCES_MAX_NUM && (
                    <Link href={href}>
                        <a className="view-all-link">View all</a>
                    </Link>
                )}
            </header>
            <div className="appearences grid-halves">
                {valid && valid.length ?
                    valid.slice(0, SUMMARY_APPEARANCES_MAX_NUM).map(a => {
                        return (<AppearanceCard key={a.id} content={a} />)
                    }) : 'There is currently no appearance information available.'}
            </div>

        </section>
    );
};

export default SummaryAppearance;