import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
      result: getCanonical(id: $id) {
      id
      ...GenericNames
      ...GenericDescriptions
      partOfUniverses(first: 5) {
        id
        __typename
        ...GenericProfileImage
        ...GenericNames
      }
      contents(first: 50) {
        ... on Starring {
          starring(filter: {relation: {eq: MAIN}}) {
            character {
              __typename
              ... on Metadata {
                id
              }
              ... on Character {
                ...GenericProfileImage
                ...GenericNames
              }
            }
          }
        }
      }
      contentsAggregate {
        count
      }
      partOfUniversesAggregate {
        count
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

export default getSummary;
