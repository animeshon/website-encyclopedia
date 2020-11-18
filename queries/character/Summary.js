import gql from 'graphql-tag';

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
    appearance(first: 7) {
      relation
      content {
        __typename
        ... on Anime {
          id
          status
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
          ageRatings {
            age
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
        ... on Manga {
          id
          status
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
          ageRatings {
            age
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
        ... on Doujinshi {
          id
          status
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
          ageRatings {
            age
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
        ... on LightNovel {
          id
          status
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
          ageRatings {
            age
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
        ... on VisualNovel {
          id
          ageRatings {
            age
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
      }
    }
  }
}
`;

export default getSummary;
