import React from 'react';
import Link from 'next/link';
import ImageGrid from '@/components/ImageGrid';

import { useContainer } from '@/components/Container';

import * as uri from '@/utilities/URI';

export const SUMMARY_IMAGES_MAX_NUM = 3;

const SummaryImages = ({ images }) => {
    const container = useContainer();
    const href = uri.Rewrite(container.type, container.title, container.id, 'pictures');

    return (
        <section className="landing-section-box">
            <header>
                <h3>Pictures</h3>
                <span />
                {images && images.length > SUMMARY_IMAGES_MAX_NUM && (
                    <Link href={href}>
                        <a className="view-all-link">View all</a>
                    </Link>
                )}
            </header>
            <ImageGrid images={(images || []).slice(0, SUMMARY_IMAGES_MAX_NUM)} className={"picture__masonry_home"}/>
        </section>
    );
};

export default SummaryImages;