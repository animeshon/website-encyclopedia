import { gql } from '@apollo/client';

const getSummary = () => gql`
  query details($id: String!) {
    result : getMagazine(id:$id)  {
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
    runnings {
      localization {
        country {
          code
        }
      }
      from
      to
    }
    genres {
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
    }
    audienceTarget
  }
}`;

export default getSummary;
