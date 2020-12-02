import gql from 'graphql-tag';

const getVoiceActors = () => gql`
  query details($id: String!) {
    result: getCharacter(id: $id) {
      id
      voices {
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
      actor {
        __typename
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
              format
              publicUri
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
}
`;

export default getVoiceActors;
