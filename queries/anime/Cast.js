import gql from 'graphql-tag';

const getAnimeCast = id => gql`
{
  queryAnime(filter: {id: {eq: "${id}"}}) {
    id
    names @cascade {
      localization {
        language(filter: {code: {eq: "eng"}}) {
          code
        }
        script {
          code
        }
      }
    }
    voiceActings {
      localization {
        language {
          code
        }
        script {
          code
        }
      }
      actor {
        gender
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
        images(first: 1) {
          type
          image {
            files {
              publicUri
            }
          }
        }
      }
      voiced {
        __typename
        ... on Character {
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

export default getAnimeCast;
