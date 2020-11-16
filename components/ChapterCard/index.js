import React from 'react';
import Link from 'next/link';

import * as uri from '@/utilities/URI';

const ChapterCard = ({ chapter }) => {
    const href = uri.Rewrite('Chapter', chapter.name, chapter.id);

    return (
        <Link href={href}>
            <a className="chapters-line">
                CHAPTER {chapter.issue_number} -{' '}
                <strong>{chapter.name.en}</strong> /{' '}
                <strong>{chapter.name.rmj}</strong> /{' '}
                <strong>{chapter.name.jp}</strong>
            </a>
        </Link>
    );
};

export default ChapterCard;