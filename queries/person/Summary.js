import gql from 'graphql-tag';

export const getSummary = () => gql`
  query details($id: String!) {
    result : getPerson(id:$id) {
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
    languages {
      code
    }
    ## TODO Contacts
    # contacts {
    # }
    circles {
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
      images {
        type
        image {
          files {
            format
            publicUri
          }
        }
      }
    }
    voiceActings {
      isPrimary
      voiced {
        ... on Character {
          id
          appearance(filter: {relation: {eq: MAIN}}, first:1)  {
            id
          }
        }
      }
    }
    birthday
    birthPlace {
      formattedAddress
    }
    hometown {
      formattedAddress
    }
    gender
    bloodType
  }
}`;

export default getSummary;
