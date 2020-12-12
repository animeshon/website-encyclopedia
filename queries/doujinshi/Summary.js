import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

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
      ...AgeRatingFull
      chapters(filter: {type: {eq: REGULAR}}) {
        id
      }
      volumes {
        id
      }
      # status
      genres {
        names @cascade {
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
      partOfCanonicals {
        partOfUniverses {
          id
          ...GenericNames
        }
        content {
          __typename
          ... on Doujinshi {
            id
          }
          ... on Manga {
            id
          }
          ... on LightNovel {
            id
          }
          ... on VisualNovel {
            id
          }
        }
        ...GenericNames
        ...GenericProfileImage
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withAgeRatingFull}
  ${Core.Fragments.textWithLocalization}
`;

export default getSummary;
