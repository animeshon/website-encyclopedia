import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';

const CharacterPreview = ({ item }) => {
    const href = uri.Rewrite('Character', item.name, item.id);
    return (
        <li>
            <Link href={href}>
                <a>
                    <div className="cover">
                        <SafeImage image={item.image} />
                    </div>
                    <span>{item.name}</span>
                </a>
            </Link>
        </li>
    );
};

export default CharacterPreview;