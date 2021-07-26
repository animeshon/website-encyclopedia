
import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const ContainerQuery = () => {
  return gql`
      query details($id: String!) {
        result : get(id:$id) {
          id
          ... on GraphGeneric {
            entityType
            ...GenericNames
            ...GenericDescriptions
          }
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

      ${Core.Fragments.withMaturityRatingFull}
      ${Core.Fragments.withRegionRestrictionFull}
    `
};

// # ...GenericProfileImage
// # ...GenericCoverImage
// ${Generic.Fragments.profileImage}
// ${Generic.Fragments.coverImage}

export default ContainerQuery