import gql from 'graphql-tag';

const getSummary = () => gql`
  query details($id: String!) {
    result : getCircle(id:$id)  {
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
    members {
      id
      names {
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
      images {
        type
        image {
          files {
            format
            publicUri
          }
        }
        ageRatings {
          age
        }
      }
    }
  }
}`;

export default getSummary;
