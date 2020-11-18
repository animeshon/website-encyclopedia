import gql from 'graphql-tag';

const getRelated = () => gql`
  query details($id: String!) {
    result : getDoujinshi(id:$id) {
      id
    relations(filter: {not: {type: {eq: UNKNOWN}}, and: {not: {type: {eq: ORIGINAL}}, and: {not: {type: {eq: PARODY}}}}}) {
      type
      object {
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

export default getRelated;
