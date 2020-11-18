import React from 'react';
import Link from 'next/link';

import PersonPreview from '@/components/PersonPreview';

import * as uri from '@/utilities/URI';

const SummaryMember = ({ type, title, id, members }) => {
    const href = uri.Rewrite(type, title, id, 'members');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Members</h3>
                <span />
                <Link href={href}>
                    <a className="view-all-link">View all</a>
                </Link>
            </header>
            <ul className="characters-list">
                {members && members.length ? members.map(item => {
                    return (<PersonPreview key={item.id} item={item} />);
                }) : 'There is currently no information about members available.'}
            </ul>
        </section>
    );
};

export default SummaryMember;