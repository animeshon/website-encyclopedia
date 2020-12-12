import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const Collaboration = {};

Collaboration.Fragments = {
  typed: gql`
    fragment CollaborationTyped on Collaboration {
      id
      role @cascade {
        ... on TypedRole {
          id
          type
        }
      }
      localization {
        ...CodeAlpha2
      }
      collaborator @include(if: $collaborator) {
        __typename
        ... on Circle {
          id
          ...GenericProfileImage
          ...GenericNames
        }
        ... on Organization {
          id
          ...GenericProfileImage
          ...GenericNames
        }
        ... on Person {
          id
          ...GenericProfileImage
          ...GenericNames
        }
        ... on Magazine {
          id
          ...GenericProfileImage
          ...GenericNames
        }
      }
      content @include(if: $content) {
        __typename
        ... on Anime {
          id
          status
          ...AgeRatingFull
          ...GenericProfileImage
          ...GenericNames
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
        }
        ... on Manga {
          id
          status
          ...AgeRatingFull
          ...GenericProfileImage
          ...GenericNames
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
        }
        ... on Doujinshi {
          id
          status
          ...AgeRatingFull
          ...GenericProfileImage
          ...GenericNames
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
        }
        ... on LightNovel {
          id
          status
          ...AgeRatingFull
          ...GenericProfileImage
          ...GenericNames
          runnings {
            localization {
              country {
                code
              }
            }
            from
            to
          }
        }
        ... on VisualNovel {
          id
          ...AgeRatingFull
          ...GenericProfileImage
          ...GenericNames
          releaseDate
        }
      }
    }
    ${Generic.Fragments.names}
    ${Generic.Fragments.profileImage}
    ${Core.Fragments.withAgeRatingFull}
    ${Core.Fragments.localizationCodeAlpha2}
  `,
};

export default Collaboration;