import React from 'react';

import getAnimeCharacters from '@/queries/anime/Characters';

import CharacterGrid from '@/components/CharacterGrid';
import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';

const AnimeCharacters = ({ characters }) => {
    return (
        <CharacterGrid characters={characters} />
    );
};

AnimeCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id: id }, getAnimeCharacters(), (data, err) => { return data.result; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images),
            role: i.relation,
        };
    });

    return {
        characters
    };
};

export default withContainer(AnimeCharacters);
