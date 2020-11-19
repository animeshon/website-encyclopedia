import gql from 'graphql-tag';

const getCharacters = () => gql`
  query details($id: String!) {
    result : getLightNovel(id:$id) {
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
          publicUri
        }
      }
    }
  }
}
`;

export default getCharacters;
