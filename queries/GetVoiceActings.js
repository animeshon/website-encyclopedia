import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const GetVoiceActings = () => gql`
  query details($id: String!) {
    result: getPerson(name: $id) {
      name
      voiceActings {
        isPrimary
        localization {
          name
          ...CodeAlpha2
        }
        voiced {
          __typename
          ... on GraphCharacter {
            name
            ...GenericNames
            entityType
            coverImage {
              ...SafeImage
            }
          }
        }
        content {
          ... on GraphGeneric {
            name
            entityType
            ...GenericNames
            coverImage {
              ...SafeImage
            }
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
              from {
                year
                month
                day
              }
              to {
                year
                month
                day
              }
            }
            releaseDate {
              year
              month
              day
            }
          }
          ... on GraphAnime {
            animeType: type
          }
        }
      }
    }
  }
  ${Generic.Fragments.safeImage}
  ${Generic.Fragments.names}
  ${Core.Fragments.localizationCodeAlpha2}
  ${Core.Fragments.textWithLocalization}
`;

export default GetVoiceActings;
