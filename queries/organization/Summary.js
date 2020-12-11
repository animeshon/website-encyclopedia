import { gql } from '@apollo/client';

const getSummary = () => gql`
  query details($id: String!) {
    result : getOrganization(id:$id)  {
    id
    names @cascade {
      text
      localization {
        language {
          code
        }
        script {
          code
        }
      }
    }
    descriptions @cascade {
      text
      localization {
        language(filter: {code: {eq: "eng"}}) {
          code
        }
        script {
          code
        }
      }
    }
    foundation
    contentFocus
  }
}`;

export default getSummary;
