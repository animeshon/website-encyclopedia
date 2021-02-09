import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

export const getSummary = () => gql`
  query details($id: String!) {
    result : getMetadata(id:$id) {
      id
      ...on Generic {
        ...GenericNames
        ...GenericDescriptions
        crossrefs {
          externalID
          namespace
          website {
            formattedAddress
          }
        }
      }
      ... on VisualNovelRelease {
        widthResolution
        heightResolution
        isPatch
        isFree
        isDoujinshi
        type
        voicedDegree
        animationStoryDegree
        animationEroDegree
        engine
        languages {
          alpha2
        }
        platforms
      }
      ... on WithRestriction {
        ...RestrictionFull
      }
      ... on WithAgeRating {
        ...AgeRatingFull
      }
      ... on Release {
        contents {
          __typename
          ... on Metadata {
            id
          }
          ...on Generic {
            ...GenericNames
            ...GenericDescriptions
          }
          ... on Content {
            status
          }
          ... on Anime {
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
            releaseDate
          }
        }
        censorship
        ean10
        ean13
        sku
        upce
        upca
      }
    }
  }
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withRestrictionFull}
  ${Core.Fragments.withAgeRatingFull}
`;

export default getSummary;
