import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const GetVoiceActors = () => gql`
  query details($id: String!) {
    result: getCharacter(name: $id) {
      name
      voices {
        isPrimary
        localization {
          name
          ...CodeAlpha2
        }
        actor {
          gender
          name
          entityType
          ...GenericNames
          coverImage {
            ...SafeImage
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
  ${Core.Fragments.localizationCodeAlpha2}
  ${Generic.Fragments.names}
`;

export default GetVoiceActors;
