import gql from 'graphql-tag';

export const performSearch = () => gql` query search($search: String!, $first: Int!, $offset: Int!, $filter: [SearchFilterType!]) {
    querySearch(queryTerm:$search, first: $first, offset: $offset, filter: $filter) {
        res : results {
            id
            type
        }
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
          # format
          publicUri
        }
      }
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
    images {
      type
      image {
        files {
          # format
          publicUri
        }
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
    images {
      type
      image {
        files {
          # format
          publicUri
        }
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
    images {
      type
      image {
        files {
          # format
          publicUri
        }
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
    images {
      type
      image {
        files {
          # format
          publicUri
        }
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
          # format
          publicUri
        }
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
    images {
      type
      image {
        files {
          # format
          publicUri
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
    images {
      type
      image {
        files {
          # format
          publicUri
        }
      }
    }
    releaseDate
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
  // TODO Universe
  // TODO Canonicals
  // TODO children volume / chapters / episode
  // ! Volume? Visual Novel Release? Music Collections?
};

export const details = async (type, id, client) => {
  if (typeToQuery[type] === undefined) {
    return undefined;
  }

  return client.query({
    query: typeToQuery[type](),
    variables: {
        id: id,
    },
  });
}

export default performSearch;
