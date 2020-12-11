import { gql } from '@apollo/client';

export const getCast = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
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
              format
              publicUri
            }
          }
        }
      }
      voiced {
        __typename
        ... on VoiceOver {
          id
        }
        ... on Character {
          id
        }
      }
    }
  }
}
`;

export default getCast;
