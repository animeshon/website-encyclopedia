import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';

const SummaryCanonical = ({ canonicals }) => {
    //const container = useContainer();
    //const href = uri.Rewrite('Canonical', title, id);

    return (
        <section className="landing-section-box">
            <header>
                <h3>Canonical Franchise</h3>
                <span />
                {/* <Link href={href}>
                        <a className="view-all-link">View all</a>
                    </Link> */}
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