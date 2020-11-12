import gql from 'graphql-tag';

const getAnimeOrganizations = id => gql`
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
          alpha2
        }
      }
      collaborator {
        ... on Person {
          id
        }
        ... on Organization {
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
          names @cascade {
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

export default getAnimeOrganizations;
