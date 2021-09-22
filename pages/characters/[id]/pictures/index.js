import React from 'react';

import withContainer, { withContainerProps } from '@/components/Container';
import getPictures from '@/queries/character/Pictures';

import ImageGrid from '@/components/ImageGrid';

import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

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

export const getProps = async (ctx, client) => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(client, PrepareQuery({ id: id }, getPictures()));

    // const images = image.All(data.images);

    return {
        // images
    };
};

export default withContainer(Pictures);
export const getServerSideProps = withContainerProps(getProps);