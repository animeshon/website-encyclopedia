import gql from 'graphql-tag';

const getAnimeEpisodes = id => gql`
{
  queryAnime(filter: {id: {eq: "${id}"}}) {
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
    episodes {
      index
      videos(first: 1) {
        video {
          duration
        }
      }
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
      images(first: 1) {
        type
        image {
          files {
            publicUri
          }
        }
      }
    }
    images(first: 1) {
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

export default getAnimeEpisodes;
