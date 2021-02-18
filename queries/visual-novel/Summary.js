import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';
import Canonizable from '@/queries/Canonizable';

export const getSummary = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
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
      length
      releaseDate
      ...AgeRatingFull
      ...RestrictionFull
      status
      genres {
        names {
          ...TextWithLocalization
        }
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
