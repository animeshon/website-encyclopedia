import React from 'react';
import Link from 'next/link';
import AppearanceCard from '@/components/AppearanceCard';
import { PruneInvalidAppearances } from '@/components/AppearanceGrid';

export const SUMMARY_APPEARANCES_MAX_NUM = 6;

const SummaryAppearance = ({ appearances, href }) => {
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