import React from 'react';

import withContainer from '@/components/Container';
import getPictures from '@/queries/character/Pictures';

import ImageGrid from '@/components/ImageGrid';

import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';

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
    const data = await ExecuteQuery(ctx, { id: id }, getPictures(), (data, err) => { return data.result; });

    const images = image.All(data.images);

    return {
        images
    };
};

export default withContainer(Pictures);
