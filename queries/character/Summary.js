import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
      result: getCharacter(id: $id) {
      id
      ...GenericNames
      ...GenericDescriptions
      birthday
      birthdayFallback
      guiseOf {
        id
        __typename
        ...GenericNames
      }
      images(filter: {not: {type: {eq: PROFILE}}, and: {not: {type: {eq: COVER}}}}, first: 4) {
        type
        image {
          files {
            format
            publicUri
          }
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
`;

export default getSummary;
