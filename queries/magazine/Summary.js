import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const getSummary = () => gql`
  query details($id: String!) {
    result : getMagazine(id:$id)  {
      id
      ...GenericNames
      ...GenericDescriptions
      runnings {
        localization {
          country {
            code
          }
        }
        from
        to
      }
      genres {
        names {
          ...TextWithLocalization
        }
      }
      audienceTarget
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.textWithLocalization}
`;

export default getSummary;
