import { gql } from '@apollo/client';

export const getSummary = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
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
      length
      # TODO uncomment after new sync
      # releaseDate
      ageRatings {
        country {
          code
        }
        age
        tag
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
