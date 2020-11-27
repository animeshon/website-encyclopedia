import gql from 'graphql-tag';

const getCollaboration = () => gql`
  query details($id: String!) {
  result: getCollaboration(id: $id) {
    id
    role {
      ... on TypedRole {
        id
        type
      }
      ... on FreeTextRole {
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
    collaborator {
      __typename
      ... on Circle {
        id
        images {
          type
          image {
            files {
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
        gender
        images {
          type
          image {
            files {
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
}
`;

export default getCollaboration;