import { gql } from '@apollo/client';

const getSummary = () => gql`
  query details($id: String!) {
    result: getCharacter(id: $id) {
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
    descriptions {
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
    birthday
    birthdayFallback
    guiseOf {
      id
      __typename
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
`;

export default getSummary;
