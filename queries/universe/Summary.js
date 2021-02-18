import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
      result: getUniverse(id: $id) {
      id
      ...GenericNames
      ...GenericDescriptions
      canonicals(first: 5) {
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
      canonicalsAggregate {
        count
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Generic.Fragments.profileImage}
`;

export default getSummary;
