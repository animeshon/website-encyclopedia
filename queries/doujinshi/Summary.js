import { gql } from '@apollo/client';
import Generic from '@/queries/Generic';
import Core from '@/queries/Core';
import Canonizable from '@/queries/Canonizable';

export const getSummary = () => gql`
  query details($id: String!) {
      result : getDoujinshi(id:$id) {
      id
      ...GenericNames
      ...GenericDescriptions
      starring(first: 5, filter: {relation: {eq: MAIN}}) {
        character {
          ... on Character {
            id
            ...GenericNames
            ...GenericDescriptions
          }
        }
      }
      type
      ...RestrictionFull
      ...AgeRatingFull
      chapters(filter: {type: {eq: REGULAR}}) {
        id
      }
      volumes {
        id
      }
      # status
      genres {
        names {
          ...TextWithLocalization
        }
      }
      runnings {
        localization {
          country {
            code
          }
        }
        from
        to
      }
      crossrefs {
        externalID
        namespace
        website {
          formattedAddress
        }
      }
      ...CanonizableUniversesSummary
      ...CanonizableCanonicalsSummary
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withAgeRatingFull}
  ${Core.Fragments.withRestrictionFull}
  ${Core.Fragments.textWithLocalization}
  ${Canonizable.Fragments.universesSummary}
  ${Canonizable.Fragments.canonicalsSummary}
`;

export default getSummary;
