import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';

const VolumeCard = ({ volume }) => {
    const href = uri.Rewrite('Volume', volume.name, volume.id);

    return (
        <div key={item.id} className="volume-cover">
            <Link href={href}>
                <a>
                    <img src={volume.image} />
                </a>
            </Link>
        </div>
    );
};

export default VolumeCard;