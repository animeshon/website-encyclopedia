import React from 'react';

import getDoujinshiCharacters from '@/queries/doujinshi/Characters';

import CharacterGrid from '@/components/CharacterGrid';

import { DoujinshiNavigation } from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';

const DoujinshiCharacters = ({ container, characters }) => {
    return (<CharacterGrid container={container} characters={characters} />);
};

DoujinshiCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, id, getDoujinshiCharacters, function (data) { return data.queryDoujinshi[0]; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: locale.LatinAny(names),
            japaneseName: locale.Japanese(data.names),
            image: image.ProfileAny(images),
            role: i.relation,
        };
    });

    return {
        characters,
        container: {
            id: data.id,
            title: locale.EnglishAny(data.names),
            bannerImage: image.ProfileAny(data.images),
            profileImage: image.Cover(data.images),
            navigation: DoujinshiNavigation(data.id),
            selected: "Characters"
        }
    };
};

export default DoujinshiCharacters;
