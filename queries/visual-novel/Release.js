import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const getReleases = () => gql`
  query details($id: String!) {
    result : getVisualNovel(id:$id) {
      id
      releases {
        __typename
        languages {
          alpha2
        }
        releaseDate
        ... on Metadata {
          id
        }
        ... on VisualNovelRelease {
          isDoujinshi
          #vnReleaseType: type
          type
          platforms
          ...AgeRatingFull
          ...GenericProfileImage
          ...GenericNames
        }
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.profileImage}
  ${Core.Fragments.withAgeRatingFull}
`;

export default getReleases;
