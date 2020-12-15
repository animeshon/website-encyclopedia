import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'


export const performSearch = () => gql` query search($search: String!, $first: SearchPaginationInt!, $offset: Int!, $filter: [SearchFilterType!], $minScore: Int = 0) {
    querySearch(queryTerm:$search, first: $first, offset: $offset, filter: $filter, minScore: $minScore) {
        res : results {
            id
            type
        }
        resultTotal
    }
}`;

const animeDetails = () => gql`
  query details($id: String!) {
      result : getAnime(id:$id) {
      id
      __typename
      type
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      runnings {
        from
        to
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

const mangaDetails = () => gql` 
  query details($id: String!) {
      result : getManga(id:$id) {
      id
      __typename
      type
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      runnings {
        from
        to
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

const doujinshiDetails = () => gql` 
  query details($id: String!) {
      result : getDoujinshi(id:$id) {
      id
      __typename
      type
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      runnings {
        from
        to
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;


const lightNovelDetails = () => gql` 
  query details($id: String!) {
      result : getLightNovel(id:$id) {
      id
      __typename
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      runnings {
        from
        to
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;


const visualNovelDetails = () => gql` 
  query details($id: String!) {
      result : getVisualNovel(id:$id) {
      id
      __typename
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      releaseDate
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

const songDetails = () => gql` 
  query details($id: String!) {
      result : getSong(id:$id) {
      id
      __typename
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      releaseDate
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

const chapterDetails = () => gql` 
  query details($id: String!) {
      result : getChapter(id:$id) {
      id
      __typename
      type
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      releaseDate
      content {
        __typename
        ...GenericNames
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

const episodeDetails = () => gql` 
  query details($id: String!) {
      result : getEpisode(id:$id) {
      id
      __typename
      type
      ...AgeRatingFull
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
      releaseDate
      content {
        __typename
        ...GenericNames
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

const characterDetails = () => gql` 
  query details($id: String!) {
      result : getCharacter(id:$id) {
      id
      __typename
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

const organizationDetails = () => gql` 
  query details($id: String!) {
      result : getOrganization(id:$id) {
      id
      __typename
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

const magazineDetails = () => gql` 
  query details($id: String!) {
      result : getMagazine(id:$id) {
      id
      __typename
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

const circleDetails = () => gql` 
  query details($id: String!) {
      result : getCircle(id:$id) {
      id
      __typename
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

const conventionDetails = () => gql` 
  query details($id: String!) {
      result : getConvention(id:$id) {
      id
      __typename
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

const personDetails = () => gql` 
  query details($id: String!) {
      result : getPerson(id:$id) {
      id
      __typename
      ...GenericProfileImage
      ...GenericNames
      ...GenericDescriptions
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

const typeToQuery = {
  "Anime": animeDetails,
  "Manga": mangaDetails,
  "Doujinshi": doujinshiDetails,
  "LightNovel": lightNovelDetails,
  "VisualNovel": visualNovelDetails,
  "Song": songDetails,
  "Episode": episodeDetails,
  "Chapter": chapterDetails,
  "Character": characterDetails,
  "Organization": organizationDetails,
  "Magazine": magazineDetails,
  "Circle": circleDetails,
  "Convention": conventionDetails,
  "Person": personDetails,
  // TODO Universe
  // TODO Canonicals
  // TODO children volume / chapters / episode
  // ! Volume? Visual Novel Release? Music Collections?
};

export const details = (type) => {
  if (typeToQuery[type] === undefined) {
    return undefined;
  }

  return typeToQuery[type]();
}

export default performSearch;
