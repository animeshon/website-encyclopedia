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
                    {/* <p>{item.type}</p> */}
                    <div className="cover">
                        <SafeImage image={item.image} />
                    </div>
                    <span>{item.name}</span>
                </a>
            </Link>
        </li>
    );
};

export default CanonicalPreview;