import gql from 'graphql-tag';

const getSummary = () => gql`
  query details($id: String!) {
    result : getConvention(id:$id)  {
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
    from
    to
    # Waiting for GraphQL patch of address field.
    # address {
    #   formattedAddress
    # }
  }
}`;

export default getSummary;
