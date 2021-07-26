import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

const CharacterPreview = ({ item }) => {
    return (
        <li>
            <Link href={item.GetURI()}>
                <a>
                    <div className="cover">
                        <SafeImage image={item.GetCoverUrl()} />
                    </div>
                    <span>{item.GetNames().Get()}</span>
                </a>
            </Link>
        </li>
    );
};

export default CharacterPreview;