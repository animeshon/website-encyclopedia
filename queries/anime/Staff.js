import gql from 'graphql-tag';

const getStaff = id => gql`
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
    staff {
      localization {
        language {
          code
        }
        country {
          code
        }
      }
      collaborator {
        ... on Organization {
          id
        }
        ... on Person {
          id
          images(first: 1, filter: {type: {eq: PROFILE}}) {
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
      role {
        ... on TypedRole {
          id
          type
        }
        ... on FreeTextRole {
          id
          tag
          names {
            text
          }
        }
      }
    }
    images(first: 1, filter: {type: {eq: PROFILE}}) {
      type
      image {
        files {
          publicUri
        }
      }
    }
  }
}
`;

export default getStaff;
