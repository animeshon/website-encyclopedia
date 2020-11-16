export const AnimeNavigation = id => [
    {
        label: 'Summary',
        href: '/anime/[id]',
        as: `/anime/${id}`,
    },
    {
        label: 'Episodes',
        href: '/anime/[id]/episodes',
        as: `/anime/${id}/episodes`,
    },
    {
        label: 'Characters',
        href: '/anime/[id]/characters',
        as: `/anime/${id}/characters`,
    },
    {
        label: 'Companies',
        href: '/anime/[id]/companies',
        as: `/anime/${id}/companies`,
    },
    {
        label: 'Staff',
        href: '/anime/[id]/staff',
        as: `/anime/${id}/staff`,
    },
    {
        label: 'Cast',
        href: '/anime/[id]/cast',
        as: `/anime/${id}/cast`,
    },
    // {
    //     label: 'Songs',
    //     href: '/anime/[id]/songs',
    //     as: `/anime/${id}/songs`,
    // },
];

export const UniverseNavigation = id => [
    {
        label: 'Summary',
        href: '/universes/[id]',
        as: `/universes/${id}`,
    },
    {
        label: 'Manga',
        href: '/universes/[id]/manga',
        as: `/universes/${id}/manga`,
    },
    {
        label: 'Anime',
        href: '/universes/[id]/anime',
        as: `/universes/${id}/anime`,
    },
    {
        label: 'Light Novel',
        href: '/universes/[id]/light-novel',
        as: `/universes/${id}/light-novel`,
    },
    {
        label: 'Visual Novel',
        href: '/universes/[id]/visual-novel',
        as: `/universes/${id}/visual-novel`,
    },
    {
        label: 'Games',
        href: '/universes/[id]/games',
        as: `/universes/${id}/games`,
    },
];

export const MangaNavigation = id => [
    {
        label: 'Summary',
        href: '/manga/[id]',
        as: `/manga/${id}`,
    },
    {
        label: 'Volumes',
        href: '/manga/[id]/volumes',
        as: `/manga/${id}/volumes`,
    },
    {
        label: 'Chapters',
        href: '/manga/[id]/chapters',
        as: `/manga/${id}/chapters`,
    },
    {
        label: 'Characters',
        href: '/manga/[id]/characters',
        as: `/manga/${id}/characters`,
    },
    {
        label: 'Companies',
        href: '/manga/[id]/companies',
        as: `/manga/${id}/companies`,
    },
    {
        label: 'Staff',
        href: '/manga/[id]/staff',
        as: `/manga/${id}/staff`,
    },
];

export const DoujinshiNavigation = id => [
    {
        label: 'Summary',
        href: '/doujinshi/[id]',
        as: `/doujinshi/${id}`,
    },
    {
        label: 'Volumes',
        href: '/doujinshi/[id]/volumes',
        as: `/doujinshi/${id}/volumes`,
    },
    {
        label: 'Chapters',
        href: '/doujinshi/[id]/chapters',
        as: `/doujinshi/${id}/chapters`,
    },
    {
        label: 'Characters',
        href: '/doujinshi/[id]/characters',
        as: `/doujinshi/${id}/characters`,
    },
    {
        label: 'Companies',
        href: '/doujinshi/[id]/companies',
        as: `/doujinshi/${id}/companies`,
    },
    {
        label: 'Staff',
        href: '/doujinshi/[id]/staff',
        as: `/doujinshi/${id}/staff`,
    },
];

export const LightNovelNavigation = id => [
    {
        label: 'Summary',
        href: '/light-novels/[id]',
        as: `/light-novels/${id}`,
    },
];

export const VisualNovelNavigation = id => [
    {
        label: 'Summary',
        href: '/visual-novels/[id]',
        as: `/visual-novels/${id}`,
    },
];

export const CharacterNavigation = id => [
    {
        label: 'Summary',
        href: '/characters/[id]',
        as: `/characters/${id}`,
    },
    {
        label: 'Appearences',
        href: '/characters/[id]/appearences',
        as: `/characters/${id}/appearences`,
    },
    {
        label: 'Voice Actors',
        href: '/characters/[id]/voice-actors',
        as: `/characters/${id}/voice-actors`,
    },
    {
        label: 'Pictures',
        href: '/characters/[id]/pictures',
        as: `/characters/${id}/pictures`,
    },
];

export const PeopleNavigation = id => [
    {
        label: 'Biography',
        href: '/people/[id]',
        as: `/people/${id}`,
    },
    {
        label: 'Productions',
        href: '/people/[id]/productions',
        as: `/people/${id}/productions`,
    },
    {
        label: 'Organizations',
        href: '/people/[id]/organizations',
        as: `/people/${id}/organizations`,
    },
];

export const CompanyNavigation = id => [
    {
        label: 'Summary',
        href: '/organizations/[id]',
        as: `/organizations/${id}`,
    },
];

const Navigation = (type, id) => {
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
        // "circles": circle,
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
    return typeToNavigation[type](id)
  };

  export default Navigation