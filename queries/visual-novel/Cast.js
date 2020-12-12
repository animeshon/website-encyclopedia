import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const getCast = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
      id
      voiceActings {
        isPrimary
        localization {
          ...CodeAlpha2
        }
        actor {
          gender
          id
          ...GenericNames
          ...GenericProfileImage
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
  ${Core.Fragments.localizationCodeAlpha2}
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
`;

export default getCast;
