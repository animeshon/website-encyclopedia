import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
    result : getOrganization(id:$id)  {
      id
      ...GenericNames
      ...GenericDescriptions
      foundation
      contentFocus
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
`;

export default getSummary;
