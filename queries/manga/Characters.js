import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

export const getCharacters = () => gql`
  query details($id: String!) {
    result : getManga(id:$id) {
      id
      starring {
        relation
        character {
          __typename
          ... on Character {
            id
            ...GenericProfileImage
            ...GenericNames
          }
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
`;

export default getCharacters;
