import React from 'react';
import Link from 'next/link';
import * as uri from '@/utilities/URI';

import { useContainer } from '@/components/Container';
import AppearanceGrid, { PruneInvalidAppearances } from '@/components/Appearance/AppearanceGrid';

export const SUMMARY_APPEARANCES_MAX_NUM = 6;

const SummaryAppearance = ({ appearances }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'appearances');

    const valid = PruneInvalidAppearances(appearances).slice(0, SUMMARY_APPEARANCES_MAX_NUM);

    return (
        <section className="landing-section-box">
            <header>
                <h3>Appearances</h3>
                <span />
                <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            <div className="appearences grid-halves">
                {valid.length ? <AppearanceGrid appearances={valid} />
                    : 'There is currently no appearance information available.'}
            </div>

        </section>
    );
};

export default SummaryAppearance;