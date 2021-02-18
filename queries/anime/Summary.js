import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';
import Canonizable from '@/queries/Canonizable';

export const getSummary = () => gql`
  query details($id: String!) {
    result : getAnime(id:$id) {
      __typename
      id
      ...GenericNames
      ...GenericDescriptions
      starring(first: 5, filter: {relation: {eq: MAIN}}) {
        character {
          ... on Metadata {
            id
          }
          ... on Character {
            ...GenericProfileImage
            ...GenericNames
          }
        }
      }
      type
      status
      ...AgeRatingFull
      ...RestrictionFull
      episodes(filter: {type: {eq: REGULAR}}) {
        id
      }
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
