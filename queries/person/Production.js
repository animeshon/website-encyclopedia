import gql from 'graphql-tag';

export const getTypedProduction = () => gql`
  query details($id: String!) {
    result : getPerson(id:$id) {
      id
      collaborations @cascade {
        id
        role  {
          ...on TypedRole {
            id
            type
          }
        }
      }
    }
  }`;