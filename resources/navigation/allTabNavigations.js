import * as uri from '@/utilities/URI';

export const AnimeNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/anime/[id]',
        as: uri.Rewrite('Anime', name, id)
    },
    {
        label: 'Episodes',
        href: '/anime/[id]/episodes',
        as: uri.Rewrite('Anime', name, id, 'episodes')
    },
    {
        label: 'Characters',
        href: '/anime/[id]/characters',
        as: uri.Rewrite('Anime', name, id, 'characters')
    },
    {
        label: 'Companies',
        href: '/anime/[id]/companies',
        as: uri.Rewrite('Anime', name, id, 'companies')
    },
    {
        label: 'Staff',
        href: '/anime/[id]/staff',
        as: uri.Rewrite('Anime', name, id, 'staff')
    },
    {
        label: 'Cast',
        href: '/anime/[id]/cast',
        as: uri.Rewrite('Anime', name, id, 'cast')
    },
    // {
    //     label: 'Songs',
    //     href: '/anime/[id]/songs',
    //     as: `/anime/${id}/songs`,
    // },
];

export const UniverseNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/universes/[id]',
        as: uri.Rewrite('Universe', name, id)
    },
    {
        label: 'Manga',
        href: '/universes/[id]/manga',
        as: uri.Rewrite('Universe', name, id, 'manga')
    },
    {
        label: 'Anime',
        href: '/universes/[id]/anime',
        as: uri.Rewrite('Universe', name, id, 'anime')
    },
    {
        label: 'Light Novel',
        href: '/universes/[id]/light-novel',
        as: uri.Rewrite('Universe', name, id, 'light-novel')
    },
    {
        label: 'Visual Novel',
        href: '/universes/[id]/visual-novel',
        as: uri.Rewrite('Universe', name, id, 'visual-novel')
    }
];

export const MangaNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/manga/[id]',
        as: uri.Rewrite('Manga', name, id)
    },
    {
        label: 'Volumes',
        href: '/manga/[id]/volumes',
        as: uri.Rewrite('Manga', name, id, 'volumes')
    },
    {
        label: 'Chapters',
        href: '/manga/[id]/chapters',
        as: uri.Rewrite('Manga', name, id, 'chapters')
    },
    {
        label: 'Characters',
        href: '/manga/[id]/characters',
        as: uri.Rewrite('Manga', name, id, 'characters')
    },
    {
        label: 'Companies',
        href: '/manga/[id]/companies',
        as: uri.Rewrite('Manga', name, id, 'companies')
    },
    {
        label: 'Staff',
        href: '/manga/[id]/staff',
        as: uri.Rewrite('Manga', name, id, 'staff')
    },
];

export const DoujinshiNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/doujinshi/[id]',
        as: uri.Rewrite('Doujinshi', name, id)
    },
    {
        label: 'Volumes',
        href: '/doujinshi/[id]/volumes',
        as: uri.Rewrite('Doujinshi', name, id, 'volumes')
    },
    {
        label: 'Chapters',
        href: '/doujinshi/[id]/chapters',
        as: uri.Rewrite('Doujinshi', name, id, 'chapters')
    },
    {
        label: 'Characters',
        href: '/doujinshi/[id]/characters',
        as: uri.Rewrite('Doujinshi', name, id, 'characters')
    },
    {
        label: 'Companies',
        href: '/doujinshi/[id]/companies',
        as: uri.Rewrite('Doujinshi', name, id, 'companies')
    },
    {
        label: 'Staff',
        href: '/doujinshi/[id]/staff',
        as: uri.Rewrite('Doujinshi', name, id, 'staff')
    },
];

export const LightNovelNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/light-novels/[id]',
        as: uri.Rewrite('LightNovel', name, id)
    },
];

export const VisualNovelNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/visual-novels/[id]',
        as: uri.Rewrite('VisualNovel', name, id)
    },
];

export const CharacterNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/characters/[id]',
        as: uri.Rewrite('Character', name, id)
    },
    {
        label: 'Appearances',
        href: '/characters/[id]/appearances',
        as: uri.Rewrite('Character', name, id, 'appearances')
    },
    {
        label: 'Voices',
        href: '/characters/[id]/voices',
        as: uri.Rewrite('Character', name, id, 'voices')
    },
    {
        label: 'Pictures',
        href: '/characters/[id]/pictures',
        as: uri.Rewrite('Character', name, id, 'pictures')
    },
];

export const PeopleNavigation = (name, id) => [
    {
        label: 'Biography',
        href: '/people/[id]',
        as: uri.Rewrite('Person', name, id)
    },
    {
        label: 'Productions',
        href: '/people/[id]/productions',
        as: uri.Rewrite('Person', name, id, 'productions')
    },
    {
        label: 'Organizations',
        href: '/people/[id]/organizations',
        as: uri.Rewrite('Person', name, id, 'organizations')
    },
];

export const CompanyNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/organizations/[id]',
        as: uri.Rewrite('Organization', name, id)
    },
];

export const CircleNavigation = (name, id) => [
    {
        label: 'Summary',
        href: '/circles/[id]',
        as: uri.Rewrite('Circle', name, id)
    },
    {
        label: 'Members',
        href: '/circles/[id]/members',
        as: uri.Rewrite('Circle', name, id, 'members')
    },
    {
        label: 'Productions',
        href: '/circles/[id]/productions',
        as: uri.Rewrite('Circle', name, id, 'productions')
    },
];

const Navigation = (type, name, id) => {
    const typeToNavigation = {
        "anime": AnimeNavigation,
        "manga": MangaNavigation,
        "doujinshi": DoujinshiNavigation,
        "light-novels": LightNovelNavigation,
        "visual-novels": VisualNovelNavigation,
        // "tracks": track,
        // "episodes": episode,
        // "chapters": chapter,
        "characters": CharacterNavigation,
        "organizations": CompanyNavigation,
        // "magazines": magazine,
        "circles": CircleNavigation,
        // "conventions": convention,
        "people": PeopleNavigation,
        "universes": UniverseNavigation,
        // TODO Canonicals
        // TODO children volume / chapters / episode
        // ! Volume? Visual Novel Release? Music Collections?
    }

    if (typeToNavigation[type] === undefined) {
        return undefined;
    }

    return typeToNavigation[type](name, id)
  };

  export default Navigation