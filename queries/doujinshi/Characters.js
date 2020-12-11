import { gql } from '@apollo/client';

export const getCharacters = () => gql`
  query details($id: String!) {
    result : getDoujinshi(id:$id) {
    id
    __typename
    names @cascade {
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
    starring {
      relation
      character {
        ... on Character {
          id
          images(first: 1, filter: {type: {eq: PROFILE}}) {
            image {
              files {
                format
                publicUri
              }
            }
          }
          names @cascade {
            text
            localization {
              script {
                code
              }
            }
          }
        }
      }
    }
    images(first: 1, filter: {type: {eq: PROFILE}}) {
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

export default getCharacters;
