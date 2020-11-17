import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';
import * as text from '@/utilities/Text';

const AppearanceCard = ({ content }) => {
    const href = uri.Rewrite(content.type, content.name, content.id);

    return (
        <div key={content.name} className="appearences__item">
            <figure className="appearences__item-cover">
                <img src={content.image} />
            </figure>
            <article className="appearences__item-contents">
                <header>
                    <Link href={href}>
                        <a>
                            <h4>{content.name}</h4>
                            <h5>{content.japaneseName}</h5>
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
                    <p>{content.role}</p>
                </aside>
            </article>
        </div>
    );
};

export default AppearanceCard;