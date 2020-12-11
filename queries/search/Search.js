import { gql } from '@apollo/client';

export const performSearch = () => gql` query search($search: String!, $first: Int!, $offset: Int!, $filter: [SearchFilterType!], $minScore: Int = 0) {
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
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    ageRatings {
      age
    }
    runnings {
      from
      to
    }
  }
}`;

const mangaDetails = () => gql` 
  query details($id: String!) {
    result : getManga(id:$id) {
    id
    __typename
    type
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    ageRatings {
      age
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    runnings {
      from
      to
    }
  }
}`;

const doujinshiDetails = () => gql` 
  query details($id: String!) {
    result : getDoujinshi(id:$id) {
    id
    __typename
    type
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    ageRatings {
      age
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    runnings {
      from
      to
    }
  }
}`;

const lightNovelDetails = () => gql` 
  query details($id: String!) {
    result : getLightNovel(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    ageRatings {
      age
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    runnings {
      from
      to
    }
  }
}`;

const visualNovelDetails = () => gql` 
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    ageRatings {
      age
    }
    releaseDate
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

const songDetails = () => gql` 
  query details($id: String!) {
    result : getSong(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    releaseDate
  }
}`;

const chapterDetails = () => gql` 
  query details($id: String!) {
    result : getChapter(id:$id) {
    id
    __typename
    type
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    ageRatings {
      age
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    releaseDate
    content {
      __typename
      ... on Manga {
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on LightNovel {
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
      ... on Doujinshi {
        names {
          text
          localization {
            language {
              code
            }
            script {
              code
            }
          }
        }
      }
    }
  }
}`;

const episodeDetails = () => gql` 
  query details($id: String!) {
    result : getEpisode(id:$id) {
    id
    __typename
    type
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    ageRatings {
      age
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
    releaseDate
    content {
        __typename
        type
        names {
            text
            localization {
                language {
                    code
                }
                script {
                    code
                }
            }
        }
    }
  }
}`;

const characterDetails = () => gql` 
  query details($id: String!) {
    result : getCharacter(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

const organizationDetails = () => gql` 
  query details($id: String!) {
    result : getOrganization(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

const magazineDetails = () => gql` 
  query details($id: String!) {
    result : getMagazine(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

const circleDetails = () => gql` 
  query details($id: String!) {
    result : getCircle(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

const conventionDetails = () => gql` 
  query details($id: String!) {
    result : getConvention(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

const personDetails = () => gql` 
  query details($id: String!) {
    result : getPerson(id:$id) {
    id
    __typename
    names {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        age
      }
    }
  }
}`;

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
