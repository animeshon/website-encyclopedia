import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const GetAppearances = () => gql`
  query details($id: String!, $first: Int!) {
    result: getCharacter(id: $id) {
      id
      appearances(first: $first) {
        relation
        content {
          ... on Metadata {
            id
          }
          ... on GraphGeneric {
            ...GenericNames
            ...GenericDescriptions
            entityType
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
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withMaturityRatingFull}
  ${Core.Fragments.withRegionRestrictionFull}
`;

//   ${Generic.Fragments.profileImage}

export default GetAppearances;
