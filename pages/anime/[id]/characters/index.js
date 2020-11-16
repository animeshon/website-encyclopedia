import React from 'react';

import getAnimeCharacters from '@/queries/anime/Characters';

import CharacterGrid from '@/components/CharacterGrid';

import { AnimeNavigation } from '@/resources/navigation/allTabNavigations';

import { withEnglishLocaleAny, withJapaneseLocale, withLatinLocaleAny } from 'utilities/Localization';
import { withQuery } from 'utilities/Query';
import { withProfileImageAny, withCoverImage } from 'utilities/Image';

const AnimeCharacters = ({ container, characters }) => {
    return (<CharacterGrid container={container} characters={characters} />);
};

AnimeCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await withQuery(ctx, id, getAnimeCharacters, function (data) { return data.queryAnime[0]; });

    const characters = (data.starring || []).map(i => {
        const { id, images, names } = i.character;
        return {
            id,
            name: withLatinLocaleAny(names),
            japaneseName: withJapaneseLocale(data.names),
            image: withProfileImageAny(images),
            role: i.relation,
        };
    });

    return {
        characters,
        container: {
            id: data.id,
            title: withEnglishLocaleAny(data.names),
            bannerImage: withProfileImageAny(data.images),
            profileImage: withCoverImage(data.images),
            navigation: AnimeNavigation(data.id),
            selected: "Characters"
        }
    };
};

export default AnimeCharacters;
