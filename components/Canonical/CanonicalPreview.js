import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import SafeImage from '@/components/SafeImage';

import * as uri from '@/utilities/URI';

import styles from './CanonicalPreview.module.css';

const CanonicalPreview = ({ canon }) => {
    const href = uri.Rewrite(canon.type, canon.name, canon.id);
    return (
        <li>
            <Link href={href}>
                <a>
                    {/* <p>{item.type}</p> */}
                    <div className={cn("cover", styles["cover"])}>
                        <SafeImage image={canon.image} />
                    </div>
                    <span>{canon.name}</span>
                </a>
            </Link>
        </li>
    );
};

export default CanonicalPreview;