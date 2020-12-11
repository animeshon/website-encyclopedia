
import Collaboration from '@/queries/Collaboration';
import { gql } from '@apollo/client';

export const getTypedStaff = () => gql`
  query details($id: String!, $collaborator: Boolean!, $content: Boolean!) {
    result : getDoujinshi(id:$id) {
      id
      staff @cascade(fields: ["role"]) {
        ...CollaborationTyped
      }
    }
  }
  ${Collaboration.Fragments.typed}
  `;