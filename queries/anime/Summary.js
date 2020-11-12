import gql from 'graphql-tag';

const getAnimeSummary = id => gql`
{
  queryAnime(filter: {id: {eq: "${id}"}}) {
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
    starring(first: 5) {
      character {
        ... on Character {
          id
          images(first: 1) {
            type
            image {
              files {
                publicUri
              }
            }
          }
          names @cascade {
            text
            localization {
              script(filter: {code: {eq: "Latn"}}) {
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
      names {
        text
      }
    }
    runnings {
      from
      to
    }
    images(first: 1) {
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

// excluded fields that cause issues
// **********************
// ageRatings {
//   age
// }

export default getAnimeSummary;
