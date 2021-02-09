import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const getRelated = () => gql`
  query details($id: String!) {
    result : getAnime(id:$id) {
      id
      relations(filter: {not: {type: {eq: UNKNOWN}}, and: {not: {type: {eq: ORIGINAL}}, and: {not: {type: {eq: PARODY}}}}}) {
        type
        object {
          __typename
          ... on Anime {
            id
            status
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
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
            status
            ...AgeRatingFull
            ...GenericProfileImage
            ...GenericNames
            releaseDate
          }
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

export default getRelated;
