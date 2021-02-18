import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

export const getSummary = () => gql`
  query details($id: String!) {
    result : getPerson(id:$id) {
      id
      ...GenericNames
      ...GenericDescriptions
      languages {
        code
      }
      ## TODO Contacts
      # contacts {
      # }
      circles {
        id
        ...GenericNames
        ...GenericProfileImage
      }
      voiceActings {
        isPrimary
        voiced {
          ... on Character {
            id
            appearances(filter: {relation: {eq: MAIN}}, first:1)  {
              id
            }
          }
        }
      }
      birthday
      birthPlace {
        formattedAddress
      }
      hometown {
        formattedAddress
      }
      gender
      bloodType
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
`;

export default getSummary;
