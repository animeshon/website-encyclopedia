import { gql } from '@apollo/client';

const getPictures = () => gql`
  query details($id: String!) {
    result: getCharacter(id: $id) {
      id
      images(filter: {not: {type: {eq: PROFILE}}, and: {not: {type: {eq: COVER}}}}) {
      type
      image {
        files {
          format
          publicUri
        }
      }
      ageRatings {
        country {
          code
        }
        age
        tag
      }
    }
  }
}
`;

export default getPictures;
