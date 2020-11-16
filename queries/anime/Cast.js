import gql from 'graphql-tag';

const getAnimeCast = () => gql`
  query details($id: String!) {
    result : getAnime(id:$id) {
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
    voiceActings {
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
        images(first: 1, filter: {type: {eq: PROFILE}}) {
          type
          image {
            files {
              publicUri
            }
          }
        }
      }
      voiced {
        ... on VoiceOver {
          id
        }
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

export default getAnimeCast;
