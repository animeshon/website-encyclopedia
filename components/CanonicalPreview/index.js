import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';

const CanonicalPreview = ({ item }) => {
    const href = uri.Rewrite('Canonical', item.name, item.id, item.type);
    return (
        <li>
            <Link href={href}>
                <a>
                    <div className="cover">
                        <SafeImage image={item.image} />
                    </div>
                    <span>{item.type}</span>
                </a>
            </Link>
        </li>
    );
};

export default CanonicalPreview;