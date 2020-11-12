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
    episodes(filter: {type: {eq: REGULAR}}) {
      id
      index
      videos {
        video {
          duration
        }
      }
      broadcasts {
        from
        to
        localization {
          country {
            code
          }
          language {
            code
          }
        }
      }
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
      images(first: 1, filter: {type: {eq: PROFILE}}) {
        type
        image {
          files {
            publicUri
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

export default getAnimeEpisodes;
