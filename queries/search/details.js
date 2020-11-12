import gql from 'graphql-tag';

const typeToQuery = {
  "Anime": animeDetails
};

const details = (type, id, client) => {
  if (typeToQuery[type] !== undefined) {
    return typeToQuery[type](id, client);
  }
  return undefined;
}

export async function animeDetails(id, client) {
  return client.query({
    query: gql` query details($id: String!)
    {
        result : getAnime(id:$id) {
          __typename
          type
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
    }`,
    variables: {
        id: id,
    },
  });
};

export default details