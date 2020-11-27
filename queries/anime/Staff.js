import gql from 'graphql-tag';

export const getTypedStaff = () => gql`
  query details($id: String!) {
    result : getAnime(id:$id) {
      id
      staff @cascade {
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