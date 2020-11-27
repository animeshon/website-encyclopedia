import gql from 'graphql-tag';

export const getVoiceActings = () => gql`
  query details($id: String!) {
  result: getPerson(id: $id) {
    id
    voiceActings {
      isPrimary
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
          images(first: 1, filter: {type: {eq: PROFILE}}) {
            type
            image {
              files {
                publicUri
              }
            }
          }
        }
        ... on VoiceOver {
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
      content {
        __typename
        ... on Anime {
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
    }
  }
}`;

export default getVoiceActings;
