import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

const Related = ({ content }) => {
    const href = uri.Rewrite(content.type, content.name, content.id);

    return (
        <div key={content.name} className="related__item">
            <figure className="related__item-cover">
                <img src={content.image} />
            </figure>
            <article className="related__item-contents">
                <header>
                    <p>{content.relation}</p>
                    <Link href={href}>
                        <a>
                            <h4>{content.name}</h4>
                        </a>
                    </Link>
                    <p>{text.Truncate(content.description, 160)}</p>
                </header>
                <aside>
                    <p>
                        {content.season}
                        <span>|</span>
                        {content.media}
                        <span>|</span>
                        {content.status}
                    </p>
                </aside>
            </article>
        </div>
    );
};

export default Related;