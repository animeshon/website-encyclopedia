import React from 'react';

import withContainer from '@/components/Container';
import getPictures from '@/queries/character/Pictures';

import ImageGrid from '@/components/ImageGrid';

import * as image from '@/utilities/Image';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';
import { SafeSearch } from '@/utilities/SafeSearch';

const Pictures = ({ images }) => {
    return (
        <main className="landing__description">
            <section className="landing-section-box">
                <header>
                    <h3>Pictures</h3>
                </header>
                <ImageGrid images={images} className={"picture__masonry"} />
            </section>
        </main>
    );
};

Pictures.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id: id }, getPictures()));
    const isSafeSearch = SafeSearch(ctx);

    const images = image.All(data.images, isSafeSearch);

    return {
        images
    };
};

export default withContainer(Pictures);
