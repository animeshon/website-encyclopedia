import React from 'react';

import getMangaCharacters from '@/queries/manga/Characters';

import CharacterGrid from '@/components/CharacterGrid';

import { MangaNavigation } from '@/resources/navigation/allTabNavigations';

import { withEnglishLocaleAny, withJapaneseLocale, withLatinLocaleAny } from 'utilities/Localization';
import { withQuery } from 'utilities/Query';
import { withProfileImageAny, withCoverImage } from 'utilities/Image';

const MangaCharacters = ({ container, characters }) => {
    return (<CharacterGrid container={container} characters={characters} />);
};

MangaCharacters.getInitialProps = async ctx => {
    const { id } = ctx.query;
    const data = await withQuery(ctx, id, getMangaCharacters, function (data) { return data.queryManga[0]; });

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
            navigation: MangaNavigation(data.id),
            selected: "Characters"
        }
    };
};

export default MangaCharacters;
