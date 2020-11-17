import React from 'react';
import Link from 'next/link';
import ImageGrid from '@/components/ImageGrid';

export const SUMMARY_IMAGES_MAX_NUM = 3;

const SummaryImages = ({ images, href }) => {
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
            {images && images.length ? 
                (<ImageGrid images={images.slice(0, SUMMARY_IMAGES_MAX_NUM)} className={"picture__masonry_home"}/>)
             : 'There is currently no picture available.'}

            
        </section>
    );
};

export default SummaryImages;