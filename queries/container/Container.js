
import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const ContainerQuery = () => {
  return gql`
      query details($id: String!) {
        result : getMetadata(id:$id) {
          id
          __typename
          ... on Generic {
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
          }
          ... on WithRestriction {
            ...RestrictionFull
          }
          ... on WithAgeRating {
            ...AgeRatingFull
          }
        }
      }
      ${Generic.Fragments.names}
      ${Generic.Fragments.descriptions}
      ${Generic.Fragments.profileImage}
      ${Core.Fragments.withAgeRatingFull}
      ${Core.Fragments.withRestrictionFull}
    `
};

export default ContainerQuery