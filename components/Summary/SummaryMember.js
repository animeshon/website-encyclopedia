import React from 'react';
import Link from 'next/link';

import { useContainer } from '@/components/Container';

import PersonPreview from '@/components/PersonPreview';

import * as uri from '@/utilities/URI';

const SummaryMember = ({ members }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'members');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Members</h3>
                <span />
                <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            {members && members.length ? <ul className="characters-list">
                {members.map(item => {
                    return (<PersonPreview key={item.id} item={item} />);
                })}
            </ul> : 'There is currently no information about members available.'}
        </section>
    );
};

export default SummaryMember;