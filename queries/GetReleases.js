import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const GetReleases = () => gql`
  query details($id: String!) {
    result : get(id:$id) {
      id
      ... on Releasable {
        releases {
            __typename
            ... on Release {
                releaseLanguage: languages {
                    alpha2
                    code
                }
                ean10
                ean13
                sku
                upce
                upca
                releaseDate
                publishingType
            }
            ... on Metadata {
                id
            }
            ... on GraphGeneric {
                ...GenericNames
                ...GenericDescriptions
                entityType
            }
            ... on GraphGameRelease {
                widthResolution
                heightResolution
                isPatch
                isFree
                gameReleaseType: type
                engine
                platforms
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
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withMaturityRatingFull}
  ${Core.Fragments.withRegionRestrictionFull}
`;

//   ${Generic.Fragments.profileImage}

export default GetReleases;