
import Content from '@/queries/Content';
import { gql } from '@apollo/client';

const GetRelated = () => {
    return gql`query related($id: String!) {
        result : getGraphGeneric(name:$id) {
            name
            ... on GraphContent {
                relations(filter: {not: {type: {eq: UNKNOWN}}, and: {not: {type: {eq: ORIGINAL}}, and: {not: {type: {eq: PARODY}}}}}) {
                    type
                    object {
                        ...ContentMinimal
                    }
                }
            }
        }
    }
    ${Content.Fragments.contentMinimal}
    `;
};

export default GetRelated