import React from 'react';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';

const VolumeCard = ({ volume }) => {
    const href = uri.Rewrite('Volume', volume.name, volume.id);

    return (
        <div key={item.id} className="volume-cover">
            <Link href={href}>
                <a>
                    <SafeImage image={volume.image} />
                </a>
            </Link>
        </div>
    );
};

export default VolumeCard;