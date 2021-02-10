import * as uri from '@/utilities/URI';

export const AnimeNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/anime/[id]?id=${id}`,
        as: uri.Rewrite('Anime', name, id)
    },
    {
        label: 'Characters',
        href: `/anime/[id]/characters?id=${id}`,
        as: uri.Rewrite('Anime', name, id, 'characters')
    },
    {
        label: 'Related',
        href: `/anime/[id]/related?id=${id}`,
        as: uri.Rewrite('Anime', name, id, 'related')
    },
    {
        label: 'Franchise',
        href: `/anime/[id]/franchise?id=${id}`,
        as: uri.Rewrite('Anime', name, id, 'franchise')
    },
    {
        label: 'Episodes',
        href: `/anime/[id]/episodes?id=${id}`,
        as: uri.Rewrite('Anime', name, id, 'episodes')
    },
    {
        label: 'Staff',
        href: `/anime/[id]/staff?id=${id}`,
        as: uri.Rewrite('Anime', name, id, 'staff')
    },
    // {
    //     label: 'Songs',
    //     href: `/anime/[id]/songs?id=${id}`,
    //     as: `/anime/${id}/songs`,
    // },
];

export const UniverseNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/universes/[id]?id=${id}`,
        as: uri.Rewrite('Universe', name, id)
    },
    {
        label: 'Series',
        href: `/universes/[id]/series?id=${id}`,
        as: uri.Rewrite('Universe', name, id, 'series')
    },
    {
        label: 'Official Content',
        href: `/universes/[id]/official-content?id=${id}`,
        as: uri.Rewrite('Universe', name, id, 'official-content')
    },
    {
        label: 'Doujinshi',
        href: `/universes/[id]/doujinshi?id=${id}`,
        as: uri.Rewrite('Universe', name, id, 'doujinshi')
    },
];

export const CanonicalNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/canonicals/[id]?id=${id}`,
        as: uri.Rewrite('Canonical', name, id)
    },
    {
        label: 'Universes',
        href: `/canonicals/[id]/universes?id=${id}`,
        as: uri.Rewrite('Canonical', name, id, 'universes')
    },
    {
        label: 'Official Content',
        href: `/canonicals/[id]/official-content?id=${id}`,
        as: uri.Rewrite('Canonical', name, id, 'official-content')
    },
    {
        label: 'Doujinshi',
        href: `/canonicals/[id]/doujinshi?id=${id}`,
        as: uri.Rewrite('Canonical', name, id, 'doujinshi')
    },
];

export const ReleasesNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/releases/[id]?id=${id}`,
        as: uri.Rewrite('Release', name, id)
    },
    // {
    //     label: 'Characters',
    //     href: `/releases/[id]/characters?id=${id}`,
    //     as: uri.Rewrite('Release', name, id, 'characters')
    // },
    // {
    //     label: 'Staff',
    //     href: `/releases/[id]/staff?id=${id}`,
    //     as: uri.Rewrite('Release', name, id, 'staff')
    // },
];

export const MangaNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/manga/[id]?id=${id}`,
        as: uri.Rewrite('Manga', name, id)
    },
    {
        label: 'Characters',
        href: `/manga/[id]/characters?id=${id}`,
        as: uri.Rewrite('Manga', name, id, 'characters')
    },
    {
        label: 'Related',
        href: `/manga/[id]/related?id=${id}`,
        as: uri.Rewrite('Manga', name, id, 'related')
    },
    {
        label: 'Franchise',
        href: `/manga/[id]/franchise?id=${id}`,
        as: uri.Rewrite('Manga', name, id, 'franchise')
    },
    {
        label: 'Volumes',
        href: `/manga/[id]/volumes?id=${id}`,
        as: uri.Rewrite('Manga', name, id, 'volumes')
    },
    {
        label: 'Chapters',
        href: `/manga/[id]/chapters?id=${id}`,
        as: uri.Rewrite('Manga', name, id, 'chapters')
    },
    {
        label: 'Staff',
        href: `/manga/[id]/staff?id=${id}`,
        as: uri.Rewrite('Manga', name, id, 'staff')
    },
];

export const DoujinshiNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/doujinshi/[id]?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id)
    },
    {
        label: 'Characters',
        href: `/doujinshi/[id]/characters?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id, 'characters')
    },
    {
        label: 'Related',
        href: `/doujinshi/[id]/related?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id, 'related')
    },
    {
        label: 'Franchise',
        href: `/doujinshi/[id]/franchise?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id, 'franchise')
    },
    {
        label: 'Volumes',
        href: `/doujinshi/[id]/volumes?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id, 'volumes')
    },
    {
        label: 'Chapters',
        href: `/doujinshi/[id]/chapters?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id, 'chapters')
    },
    {
        label: 'Staff',
        href: `/doujinshi/[id]/staff?id=${id}`,
        as: uri.Rewrite('Doujinshi', name, id, 'staff')
    },
];

export const LightNovelNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/light-novels/[id]?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id)
    },
    {
        label: 'Characters',
        href: `/light-novels/[id]/characters?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id, 'characters')
    },
    {
        label: 'Related',
        href: `/light-novels/[id]/related?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id, 'related')
    },
    {
        label: 'Franchise',
        href: `/light-novels/[id]/franchise?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id, 'franchise')
    },
    {
        label: 'Volumes',
        href: `/light-novels/[id]/volumes?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id, 'volumes')
    },
    {
        label: 'Chapters',
        href: `/light-novels/[id]/chapters?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id, 'chapters')
    },
    {
        label: 'Staff',
        href: `/light-novels/[id]/staff?id=${id}`,
        as: uri.Rewrite('LightNovel', name, id, 'staff')
    },
];

export const VisualNovelNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/visual-novels/[id]?id=${id}`,
        as: uri.Rewrite('VisualNovel', name, id)
    },
    {
        label: 'Characters',
        href: `/visual-novels/[id]/characters?id=${id}`,
        as: uri.Rewrite('VisualNovel', name, id, 'characters')
    },
    {
        label: 'Related',
        href: `/visual-novels/[id]/related?id=${id}`,
        as: uri.Rewrite('VisualNovel', name, id, 'related')
    },
    {
        label: 'Franchise',
        href: `/visual-novels/[id]/franchise?id=${id}`,
        as: uri.Rewrite('VisualNovel', name, id, 'franchise')
    },
    {
        label: 'Releases',
        href: `/visual-novels/[id]/releases?id=${id}`,
        as: uri.Rewrite('VisualNovel', name, id, 'releases')
    },
    {
        label: 'Staff',
        href: `/visual-novels/[id]/staff?id=${id}`,
        as: uri.Rewrite('VisualNovel', name, id, 'staff')
    },
];

export const CharacterNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/characters/[id]?id=${id}`,
        as: uri.Rewrite('Character', name, id)
    },
    {
        label: 'Appearances',
        href: `/characters/[id]/appearances?id=${id}`,
        as: uri.Rewrite('Character', name, id, 'appearances')
    },
    {
        label: 'Voices',
        href: `/characters/[id]/voices?id=${id}`,
        as: uri.Rewrite('Character', name, id, 'voices')
    },
    {
        label: 'Pictures',
        href: `/characters/[id]/pictures?id=${id}`,
        as: uri.Rewrite('Character', name, id, 'pictures')
    },
];

export const PeopleNavigation = (name, id) => [
    {
        label: 'Biography',
        href: `/people/[id]?id=${id}`,
        as: uri.Rewrite('Person', name, id)
    },
    {
        label: 'Voice Actings',
        href: `/people/[id]/voice-actings?id=${id}`,
        as: uri.Rewrite('Person', name, id, 'voice-actings')
    },
    {
        label: 'Productions',
        href: `/people/[id]/productions?id=${id}`,
        as: uri.Rewrite('Person', name, id, 'productions')
    },
];

export const CompanyNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/organizations/[id]?id=${id}`,
        as: uri.Rewrite('Organization', name, id)
    },
    {
        label: 'Productions',
        href: `/organizations/[id]/productions?id=${id}`,
        as: uri.Rewrite('Organization', name, id, 'productions')
    },
];

export const MagazineNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/magazines/[id]?id=${id}`,
        as: uri.Rewrite('Magazine', name, id)
    },
    {
        label: 'Productions',
        href: `/magazines/[id]/productions?id=${id}`,
        as: uri.Rewrite('Magazine', name, id, 'productions')
    },
];

export const CircleNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/circles/[id]?id=${id}`,
        as: uri.Rewrite('Circle', name, id)
    },
    {
        label: 'Members',
        href: `/circles/[id]/members?id=${id}`,
        as: uri.Rewrite('Circle', name, id, 'members')
    },
    {
        label: 'Productions',
        href: `/circles/[id]/productions?id=${id}`,
        as: uri.Rewrite('Circle', name, id, 'productions')
    },
];

export const ConventionNavigation = (name, id) => [
    {
        label: 'Summary',
        href: `/conventions/[id]?id=${id}`,
        as: uri.Rewrite('Convention', name, id)
    },
    {
        label: 'Releases',
        href: `/conventions/[id]/releases?id=${id}`,
        as: uri.Rewrite('Convention', name, id, 'releases')
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
        "magazines": MagazineNavigation,
        "circles": CircleNavigation,
        "conventions": ConventionNavigation,
        "people": PeopleNavigation,
        "universes": UniverseNavigation,
        "canonicals": CanonicalNavigation,
        "releases": ReleasesNavigation,
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