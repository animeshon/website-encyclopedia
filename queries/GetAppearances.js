import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const GetAppearances = () => gql`
  query details($id: String!, $first: Int!) {
    result: getCharacter(name: $id) {
      name
      appearances(first: $first) {
        relation
        content {
          ... on GraphGeneric {
            name
            ...GenericNames
            ...GenericDescriptions
            entityType
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
          ... on GraphGraphicNovel {
            graphicNovelType: type
          }
          ... on GraphGameRelease {
            gameReleaseType: type
          }
          ... on WithMaturityRating {
            ...MaturityRatingFull
          }
          ... on WithRegionRestriction {
            ...RegionRestrictionFull
          }
        }
      }
    }
  }
  ${Generic.Fragments.safeImage}
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withMaturityRatingFull}
  ${Core.Fragments.withRegionRestrictionFull}
`;

//   ${Generic.Fragments.profileImage}

export default GetAppearances;
