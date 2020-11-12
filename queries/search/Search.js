import gql from 'graphql-tag';

const performSearch = () => gql`
query search($search: String!, $first: Int!, $offset: Int!, $filter: [SearchFilterType!]){
    querySearch(queryTerm:$search, first: $first, offset: $offset, filter: $filter) {
        res : results {
            id
            type
        }
    }
}`;

export default performSearch;
