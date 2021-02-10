import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';
import Canonizable from '@/queries/Canonizable';

export const getSummary = () => gql`
  query details($id: String!) {
    result : getManga(id:$id) {
      id
      ...GenericNames
      ...GenericDescriptions
      starring(first: 5, filter: {relation: {eq: MAIN}}) {
        character {
          ... on Character {
            id
            ...GenericProfileImage
            ...GenericNames
          }
        }
      }
      ...AgeRatingFull
      ...RestrictionFull
      type
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
  ${Core.Fragments.withRestrictionFull}
  ${Core.Fragments.withAgeRatingFull}
  ${Core.Fragments.textWithLocalization}
  ${Canonizable.Fragments.universesSummary}
  ${Canonizable.Fragments.canonicalsSummary}
`;

export default getSummary;
