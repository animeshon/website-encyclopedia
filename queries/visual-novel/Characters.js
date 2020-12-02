import gql from 'graphql-tag';

export const getCharacters = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
    id
    starring {
      relation
      character {
        __typename
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
  }
}
`;

export default getCharacters;
