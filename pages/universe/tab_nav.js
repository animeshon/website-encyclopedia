export default id => [
    {
        label: 'Summary',
        href: '/universe/[universe_id]/',
        as: `/universe/${id}`,
    },
    {
        label: 'Manga',
        href: '/universe/[universe_id]/manga',
        as: `/universe/${id}/manga`,
    },
    {
        label: 'Anime',
        href: '/universe/[universe_id]/anime',
        as: `/universe/${id}/anime`,
    },
    {
        label: 'Light Novel',
        href: '/universe/[universe_id]/light-novel',
        as: `/universe/${id}/light-novel`,
    },
    {
        label: 'Visual Novel',
        href: '/universe/[universe_id]/visual-novel',
        as: `/universe/${id}/visual-novel`,
    },
    {
        label: 'Games',
        href: '/universe/[universe_id]/games',
        as: `/universe/${id}/games`,
    },
];
