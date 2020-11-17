import gql from 'graphql-tag';

const getAppearances = () => gql`
  query details($id: String!) {
    result: getCharacter(id: $id) {
      id
      appearance {
      relation
      content {
        __typename
        ... on Anime {
          id
          status
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
          descriptions {
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
        ... on Manga {
          id
          status
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
          descriptions {
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
          id
          status
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
          descriptions {
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
          id
          status
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
          descriptions {
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
        ... on VisualNovel {
          id
          images {
            type
            image {
              files {
                format
                publicUri
              }
            }
          }
          descriptions {
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
  }
}
`;

export default getAppearances;
