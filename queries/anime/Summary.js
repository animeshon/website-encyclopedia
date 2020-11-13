import gql from 'graphql-tag';

const getAnimeSummary = id => gql`
{
  queryAnime(filter: {id: {eq: "${id}"}}) {
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
                publicUri
              }
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
    episodes(filter: {type: {eq: REGULAR}}) {
      id
    }
    status
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
      }
    }
  }
}
`;

// excluded fields that cause issues
// **********************
// ageRatings {
//   age
// }

export default getAnimeSummary;
