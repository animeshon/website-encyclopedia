import { gql } from '@apollo/client';
import Content from '@/queries/Content'
// ! TODO as soon as he doujinshi type is properly implemented, refactor the query in order to get official or doujinshi separately

const getContent = () => gql`
  query content($id: String!) {
      result: getUniverse(id: $id) {
        id
        contents {
          ... on Metadata {
            ...ContentMinimal
          }
        }
    }
  }
  ${Content.Fragments.contentMinimal}
`;

export default getContent;
