import { gql } from '@apollo/client';

const Collaboration = {};

Collaboration.Fragments = {
  typed: gql`
    fragment CollaborationTyped on Collaboration {
      id
      role @cascade {
        ... on TypedRole {
          id
          type
        }
      }
      localization {
        language {
          code
          alpha2
        }
        country {
          code
          alpha2
        }
      }
      collaborator @include(if: $collaborator) {
        __typename
        ... on Circle {
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
        ... on Organization {
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
        ... on Person {
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
        ... on Magazine {
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
      content @include(if: $content) {
        __typename
        __typename
        ... on Anime {
          id
          status
          ageRatings {
            age
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
          ageRatings {
            age
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
          ageRatings {
            age
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
          ageRatings {
            age
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
  `,
};

export default Collaboration;