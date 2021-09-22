import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'
import Content from '@/queries/Content';

const Collaboration = {};

Collaboration.Fragments = {
  typed: gql`
    fragment CollaborationTyped on Collaboration {
      id
      role {
        # ... on Metadata {
        #   id
        # } 
        ... on TypedJobRole {
          type
        }
      }
      localization {
        ...CodeAlpha2
      }
      collaborator @include(if: $collaborator) {
        ... on Metadata {
          id
        }
        ... on GraphGeneric {
          entityType
          coverImage {
            ...SafeImage
          }
          ...GenericNames
        }
      }
      content @include(if: $content) {
        ...ContentMinimal
      }
    }
    ${Generic.Fragments.safeImage}
    ${Generic.Fragments.names}
    ${Core.Fragments.localizationCodeAlpha2}
    ${Content.Fragments.contentMinimal}
  `,
};

export default Collaboration;