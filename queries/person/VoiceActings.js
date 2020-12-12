import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const getVoiceActings = () => gql`
  query details($id: String!) {
    result: getPerson(id: $id) {
      id
      voiceActings {
        isPrimary
        localization {
          ...CodeAlpha2
        }
        voiced {
          __typename
          ... on Character {
            id
            ...GenericNames
            ...GenericProfileImage
          }
          ... on VoiceOver {
            id
            names @cascade {
              ...TextWithLocalization
            }
          }
        }
        content {
          __typename
          ... on Anime {
            id
            ...GenericNames
          }
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.localizationCodeAlpha2}
  ${Core.Fragments.textWithLocalization}
`;

export default getVoiceActings;
