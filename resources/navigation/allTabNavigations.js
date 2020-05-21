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
        href: '/universe/[anime_id]',
        as: `/universe/${universeId}`,
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
        label: 'Biography',
        href: '/characters/[character_id]',
        as: `/character/${characterId}`,
    },
];

export const PeopleNavigation = personId => [
    {
        label: 'Biography',
        href: '/people/[person_id]',
        as: `/people/${personId}`,
    },
];

export const CompanyNavigation = companyId => [
    {
        label: 'Summary',
        href: '/companies/[company_id]',
        as: `/companies/${companyId}`,
    },
];
