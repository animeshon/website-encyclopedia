import gql from 'graphql-tag';

const getAnimeCharacters = id => gql`
{
  queryAnime(filter: {id: {eq: "${id}"}}) {
    id
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

export default getAnimeCharacters;
