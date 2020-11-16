import gql from 'graphql-tag';

const getAnimeCharacters = () => gql`
  query details($id: String!) {
    result : getAnime(id:$id) {
    id
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
  }
}
`;

export default getAnimeCharacters;
