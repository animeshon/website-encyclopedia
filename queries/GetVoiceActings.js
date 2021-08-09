import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const GetVoiceActings = () => gql`
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
          ... on Metadata {
            id
          }
          ... on GraphCharacter {
            ...GenericNames
            entityType
            # ...GenericProfileImage
          }
          ... on GraphVoiceOver {
            entityType
            names {
              ...TextWithLocalization
            }
          }
        }
        content {
          ... on Metadata {
            id
          }
          ... on GraphGeneric {
            entityType
            ...GenericNames
          }
          ... on GraphContent {
            publishingType
            original
            status
            runnings {
              localization {
                country {
                  code
                }
              }
              from
              to
            }
            releaseDate
          }
          ... on GraphAnime {
            animeType: type
          }
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Core.Fragments.localizationCodeAlpha2}
  ${Core.Fragments.textWithLocalization}
`;

//   ${Generic.Fragments.profileImage}
export default GetVoiceActings;
