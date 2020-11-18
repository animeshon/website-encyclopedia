import React from 'react';

import getCharacters from '@/queries/manga/Characters';

import CharacterGrid from '@/components/CharacterGrid';
import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery, PrepareQuery } from '@/utilities/Query';

const MangaCharacters = ({ characters }) => {
    return (<CharacterGrid characters={characters} />);
};

MangaCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, PrepareQuery({ id:id }, getCharacters()));

    const characters = (data.starring || []).map(i => {
        const { id, images, names, __typename } = i.character;
        return {
            id,
            type: __typename,
            name: locale.LatinAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images),
            role: CharacterRole(i.relation),
            relation: i.relation,
        }
    });

    return {
        characters
    };
};

export default withContainer(MangaCharacters);
