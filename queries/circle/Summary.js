import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
      result : getCircle(id:$id)  {
      id
      ...GenericNames
      ...GenericDescriptions
      foundation
      members {
        id
        ...GenericNames
        ...GenericProfileImage
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
`;

export default getSummary;
