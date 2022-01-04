
import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const ContainerQuery = () => {
  return gql`
      query details($id: String!) {
        result : getGraphGeneric(name:$id) {
          name
          entityType
          coverImage {
            ...SafeImage
          }
          bannerImage {
            ...SafeImage
          }
          ...GenericNames
          ...GenericDescriptions
          ... on WithRegionRestriction {
            ...RegionRestrictionFull
          }
          ... on WithMaturityRating {
            ...MaturityRatingFull
          }
          ... on GraphAnime {
            animeType: type
          }
          ... on GraphOrganization {
            organizationType: type
          }
          ... on GraphGraphicNovel {
            graphicNovelType: type
          }
        }
      }
      ${Generic.Fragments.names}
      ${Generic.Fragments.descriptions}
      ${Generic.Fragments.safeImage}
      ${Core.Fragments.withMaturityRatingFull}
      ${Core.Fragments.withRegionRestrictionFull}
    `
};

export default ContainerQuery