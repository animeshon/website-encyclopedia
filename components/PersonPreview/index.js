import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';

const PersonPreview = ({ item }) => {
    const href = uri.Rewrite('Person', item.name, item.id);
    return (
        <li>
            <Link href={href}>
                <a>
                    <div className="cover">
                        <img src={item.image} />
                    </div>
                    <span>{item.name}</span>
                </a>
            </Link>
        </li>
    );
};

export default PersonPreview;