import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'
import Content from '@/queries/Content'

const getCanonicals = () => gql`
  query details($id: String!, $firstContents: Int!) {
      result: getUniverse(id: $id) {
        canonicals {
          id
          coverImage {
            ...SafeImage
          }
          ...GenericNames
          ...GenericDescriptions
          # ... on WithRestriction {
          #     ...RestrictionFull
          # }
          # ... on WithAgeRating {
          #     ...AgeRatingFull
          # }
          contents (first: $firstContents) {
            ...ContentMinimal
          }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.safeImage}
  ${Content.Fragments.contentMinimal}
`;

export default getCanonicals;
