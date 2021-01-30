import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
      result : getConvention(id:$id)  {
      id
      ...GenericNames
      ...GenericDescriptions
      ...GenericProfileImage
      from
      to
      # TODO: Waiting for GraphQL patch of address field.
      # address {
      #   formattedAddress
      # }
      # TODO: Add missing releases field.
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
`;

export default getSummary;
