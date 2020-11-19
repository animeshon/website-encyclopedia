import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';

const PersonPreview = ({ item }) => {
    const href = uri.Rewrite('Person', item.name, item.id);
    return (
        <li>
            <Link href={href}>
                <a>
                    <div className="cover">
                        <SafeImage image={item.image} force={false} />
                    </div>
                    <span>{item.name}</span>
                </a>
            </Link>
        </li>
    );
};

export default PersonPreview;