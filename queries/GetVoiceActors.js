import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const GetVoiceActors = () => gql`
  query details($id: String!) {
    result: getCharacter(id: $id) {
      id
      voices {
        isPrimary
        localization {
          ...CodeAlpha2
        }
        actor {
          gender
          id
          ... on GraphGeneric {
            entityType
            ...GenericNames
            coverImage {
              ...SafeImage
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
  ${Generic.Fragments.safeImage}
  ${Core.Fragments.localizationCodeAlpha2}
  ${Generic.Fragments.names}
`;

export default GetVoiceActors;
