export const AnimeNavigation = animeId => [
    {
        label: 'Summary',
        href: '/anime/[anime_id]',
        as: `/anime/${animeId}`,
    },
    {
        label: 'Episodes',
        href: '/anime/[anime_id]/episodes',
        as: `/anime/${animeId}/episodes`,
    },
    {
        label: 'Characters',
        href: '/anime/[anime_id]/characters',
        as: `/anime/${animeId}/characters`,
    },
    {
        label: 'Companies',
        href: '/anime/[anime_id]/companies',
        as: `/anime/${animeId}/companies`,
    },
    {
        label: 'Staff',
        href: '/anime/[anime_id]/staff',
        as: `/anime/${animeId}/staff`,
    },
    {
        label: 'Cast',
        href: '/anime/[anime_id]/cast',
        as: `/anime/${animeId}/cast`,
    },
    // {
    //     label: 'Songs',
    //     href: '/anime/[anime_id]/songs',
    //     as: `/anime/${animeId}/songs`,
    // },
];

export const UniverseNavigation = universeId => [
    {
        label: 'Summary',
        href: '/universe/[universe_id]',
        as: `/universe/${universeId}`,
    },
    {
        label: 'Manga',
        href: '/universe/[universe_id]/manga',
        as: `/universe/${universeId}/manga`,
    },
    {
        label: 'Anime',
        href: '/universe/[universe_id]/anime',
        as: `/universe/${universeId}/anime`,
    },
    {
        label: 'Light Novel',
        href: '/universe/[universe_id]/light-novel',
        as: `/universe/${universeId}/light-novel`,
    },
    {
        label: 'Visual Novel',
        href: '/universe/[universe_id]/visual-novel',
        as: `/universe/${universeId}/visual-novel`,
    },
    {
        label: 'Games',
        href: '/universe/[universe_id]/games',
        as: `/universe/${universeId}/games`,
    },
];

export const MangaNavigation = mangaId => [
    {
        label: 'Summary',
        href: '/manga/[manga_id]',
        as: `/manga/${mangaId}`,
    },
    {
        label: 'Volumes',
        href: '/manga/[manga_id]/volumes',
        as: `/manga/${mangaId}/volumes`,
    },
    {
        label: 'Chapters',
        href: '/manga/[manga_id]/chapters',
        as: `/manga/${mangaId}/chapters`,
    },
    {
        label: 'Characters',
        href: '/manga/[manga_id]/characters',
        as: `/manga/${mangaId}/characters`,
    },
    {
        label: 'Companies',
        href: '/manga/[manga_id]/companies',
        as: `/manga/${mangaId}/companies`,
    },
    {
        label: 'Staff',
        href: '/manga/[manga_id]/staff',
        as: `/manga/${mangaId}/staff`,
    },
];

export const LightNovelNavigation = lightNovelId => [
    {
        label: 'Summary',
        href: '/light-novels/[light_novel_id]',
        as: `/light-novels/${lightNovelId}`,
    },
];

export const VisualNovelNavigation = visualNovelId => [
    {
        label: 'Summary',
        href: '/visual-novels/[visual_novel_id]',
        as: `/visual-novels/${visualNovelId}`,
    },
];

export const GamesNavigation = gameId => [
    {
        label: 'Summary',
        href: '/games/[visual_novel_id]',
        as: `/games/${gameId}`,
    },
];

export const CharacterNavigation = characterId => [
    {
        label: 'Summary',
        href: '/characters/[character_id]',
        as: `/characters/${characterId}`,
    },
    {
        label: 'Appearences',
        href: '/characters/[character_id]/appearences',
        as: `/characters/${characterId}/appearences`,
    },
    {
        label: 'Voice Actors',
        href: '/characters/[character_id]/voice-actors',
        as: `/characters/${characterId}/voice-actors`,
    },
    {
        label: 'Pictures',
        href: '/characters/[character_id]/pictures',
        as: `/characters/${characterId}/pictures`,
    },
];

export const PeopleNavigation = personId => [
    {
        label: 'Biography',
        href: '/people/[people_id]',
        as: `/people/${personId}`,
    },
    {
        label: 'Productions',
        href: '/people/[people_id]/productions',
        as: `/people/${personId}/productions`,
    },
    {
        label: 'Organizations',
        href: '/people/[people_id]/organizations',
        as: `/people/${personId}/organizations`,
    },
];

export const CompanyNavigation = companyId => [
    {
        label: 'Summary',
        href: '/companies/[company_id]',
        as: `/companies/${companyId}`,
    },
];
