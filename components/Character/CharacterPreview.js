import React, { useRef } from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

const CharacterPreview = ({ item }) => {
    const thisRef = useRef(null);
    return (
        <li>
            <Link href={item.GetURI()}>
                <a>
                    <div className="cover" ref={thisRef}>
                        <SafeImage image={item.CoverImage()} parent={thisRef} />
                    </div>
                    <span>{item.GetNames().Get()}</span>
                </a>
            </Link>
        </li>
    );
};

export default CharacterPreview;