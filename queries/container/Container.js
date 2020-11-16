
import gql from 'graphql-tag';


const anime = () => gql`
  query details($id: String!) {
    result : getAnime(id:$id) {
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const manga = () => gql`
  query details($id: String!) {
    result : getManga(id:$id) {
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const doujinshi = () => gql`
  query details($id: String!) {
    result : getDoujinshi(id:$id) {
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const lightNovel = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const visualNovel = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const track = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const chapter = () => gql`
  query details($id: String!) {
    result : getChapter(id:$id) {
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const episode = () => gql`
  query details($id: String!) {
    result : getEpisode(id:$id) {
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const character = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const organization = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const person = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const magazine = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const circle = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

const convention = () => gql`
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
    images {
      type
      image {
        files {
          format
          publicUri
        }
      }
    }
  }
}`;

// ! keep synced with first element of the url in nex.config.js
// TODO remove after dgraph resolves resolution of fragments on interfaces
// TODO using a getMetadata + on Generic fragment for every resource.
// https://discuss.dgraph.io/t/fragments-on-interface-not-resolving/11441/3

const ContainerQuery = (type) => {
    const typeToQuery = {
        "anime": anime,
        "manga": manga,
        "doujinshi": doujinshi,
        "light-novels": lightNovel,
        "visual-novels": visualNovel,
        "tracks": track,
        "episodes": episode,
        "chapters": chapter,
        "characters": character,
        "organizations": organization,
        "magazines": magazine,
        "circles": circle,
        "conventions": convention,
        "people": person,
        // TODO Universe
        // TODO Canonicals
        // TODO children volume / chapters / episode
        // ! Volume? Visual Novel Release? Music Collections?
    }
    if (typeToQuery[type] === undefined) {
        return undefined;
    }
    return typeToQuery[type]()
  };

  export default ContainerQuery