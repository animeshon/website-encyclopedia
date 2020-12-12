import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const getAppearances = () => gql`
  query details($id: String!, $first: Int!) {
    result: getCharacter(id: $id) {
      id
      appearance(first: $first) {
      relation
      content {
        __typename
        ... on Anime {
            id
            status
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
            runnings {
              localization {
                country {
                  code
                }
              }
              from
              to
            }
          }
          ... on Manga {
            id
            status
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
            runnings {
              localization {
                country {
                  code
                }
              }
              from
              to
            }
          }
          ... on Doujinshi {
            id
            status
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
            runnings {
              localization {
                country {
                  code
                }
              }
              from
              to
            }
          }
          ... on LightNovel {
            id
            status
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
            runnings {
              localization {
                country {
                  code
                }
              }
              from
              to
            }
          }
          ... on VisualNovel {
            id
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
            releaseDate
          }
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withAgeRatingFull}
`;

export default getAppearances;
