import React from 'react';

import getDoujinshiCharacters from '@/queries/doujinshi/Characters';

import CharacterGrid from '@/components/CharacterGrid';

import withContainer from '@/components/Container';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';
import { SafeSearch } from '@/utilities/SafeSearch';

const DoujinshiCharacters = ({ characters }) => {
    return (<CharacterGrid characters={characters} />);
};

DoujinshiCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, { id:id }, getDoujinshiCharacters(), (data, err) => { return data.result; });
    const isSafeSearch = SafeSearch(ctx);

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
            image: image.ProfileAny(images, isSafeSearch),
            role: i.relation,
        });
    });

    return {
        characters
    };
};

export default withContainer(DoujinshiCharacters);
