import React from 'react';

import getAnimeCharacters from '@/queries/anime/Characters';

import CharacterGrid from '@/components/CharacterGrid';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import * as locale from '@/utilities/Localization';
import * as image from '@/utilities/Image';
import { ExecuteQuery } from '@/utilities/Query';

const AnimeCharacters = ({ container, characters }) => {
    return (<CharacterGrid container={container} characters={characters} />);
};

AnimeCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await ExecuteQuery(ctx, id, getAnimeCharacters, function (data) { return data.queryAnime[0]; });

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
        characters: characters,
        container: {
            id: data.id,
            title: locale.EnglishAny(data.names),
            bannerImage: image.ProfileAny(data.images),
            profileImage: image.Cover(data.images),
            navigation: AnimeNavigation(data.id),
            selected: "Characters"
        }
    };
};

export default AnimeCharacters;
