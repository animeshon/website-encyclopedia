import { gql } from '@apollo/client';

export const getSummary = () => gql`
  query details($id: String!) {
    result : getDoujinshi(id:$id) {
    id
    names @cascade {
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
        language(filter: {code: {eq: "eng"}}) {
          code
        }
        script {
          code
        }
      }
    }
    starring(first: 5, filter: {relation: {eq: MAIN}}) {
      character {
        ... on Character {
          id
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
    type
    ageRatings {
      country {
        code
      }
      age
      tag
    }
    chapters(filter: {type: {eq: REGULAR}}) {
      id
    }
    volumes {
      id
    }
    # status
    genres {
      names @cascade {
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
    runnings {
      localization {
        country {
          code
        }
      }
      from
      to
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
    partOfCanonicals {
      partOfUniverses {
        id
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
      content {
        __typename
        ... on Doujinshi {
          id
        }
        ... on Manga {
          id
        }
        ... on LightNovel {
          id
        }
        ... on VisualNovel {
          id
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
  }
}`;

export default getSummary;
