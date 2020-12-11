import { gql } from '@apollo/client';
import Collaboration from '@/queries/Collaboration';

export const getTypedProduction = () => gql`
  query details($id: String!, $collaborator: Boolean!, $content: Boolean!) {
    result : getPerson(id:$id) {
      id
      collaborations @cascade(fields: ["role"]) {
        ...CollaborationTyped
      }
    }
  }
  ${Collaboration.Fragments.typed}
  `;