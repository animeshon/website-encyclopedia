
import Collaboration from '@/queries/Collaboration';
import { gql } from '@apollo/client';

// TODO improve logic in order to get only ALL roles
export const GetTypedStaff = () => gql`
    query details($id: String!, $collaborator: Boolean!, $content: Boolean!, $roleIn: [TypedJobRoleType] = []) {
        result : get(id:$id) {
            id
            ... on WithStaff {
                staff(filter: {in: $roleIn}) {
                    ...CollaborationTyped
                }
            }
            ... on Collaborator {
                collaborations(filter: {in: $roleIn}) {
                    ...CollaborationTyped
                }
            }
        }
    }
    ${Collaboration.Fragments.typed}
`;
