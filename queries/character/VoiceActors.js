import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const getVoiceActors = () => gql`
  query details($id: String!) {
      result: getCharacter(id: $id) {
        id
        voices {
        isPrimary
        localization {
          ...CodeAlpha2
        }
        actor {
          __typename
          gender
          id
          ...GenericNames
          ...GenericProfileImage
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
  ${Core.Fragments.localizationCodeAlpha2}
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
`;

export default getVoiceActors;
