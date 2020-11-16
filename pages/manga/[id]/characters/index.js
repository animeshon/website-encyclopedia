import React from 'react';

import getMangaCharacters from '@/queries/manga/Characters';

import CharacterGrid from '@/components/CharacterGrid';
import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';

const MangaCharacters = ({ characters }) => {
    return (<CharacterGrid characters={characters} />);
};

MangaCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id:id }, getMangaCharacters(), (data, err) => { return data.result; });

    const characters = new Object();
    (data.starring || []).forEach(i => {
        const { id, images, names } = i.character;
        if (characters[i.relation] === undefined) {
            characters[i.relation] = [];
        }
        characters[i.relation].push({
            id,
            name: locale.LatinAny(names),
            japaneseName: locale.Japanese(names),
            image: image.ProfileAny(images),
            role: i.relation,
        });
    });

    return {
        characters
    };
};

export default withContainer(MangaCharacters);
