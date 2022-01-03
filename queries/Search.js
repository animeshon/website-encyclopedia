import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'


export const performSearch = () => gql` 
  query searchFulltext(
    $search: String!
    $first: Int!
    $offset: Int!
    $filter: SearchFulltextFilterInput
    $order: SearchSortInput!
  ) {
    searchFulltext(
      query: $search
      first: $first
      offset: $offset
      filter: $filter
      order: $order
    ) {
      res: results {
        __typename
        ... on GraphConvention {
          from {
            year
            month
            day
          }
          to {
            year
            month
            day
          }
        }
        ... on GraphOrganization {
          foundation {
            year
            month
            day
          }
          organizationType: type
        }
        ... on GraphAnime {
          animeType: type
          animeEpisodeCount: episodeCount
          animeEpisodeAggregate: episodesAggregate(
            filter: { type: { in: [REGULAR, RECAP] } }
          ) {
            count
          }
        }
        ... on GraphLightNovel {
          lightNovelChapterCount: chapterCount
          lightNovelChapterAggregate: chaptersAggregate(
            filter: { type: { eq: REGULAR } }
          ) {
            count
          }
        }
        ... on GraphGraphicNovel {
          graphicNovelType: type
          graphicNovelChapterCount: chapterCount
          graphicNovelChapterAggregate: chaptersAggregate(
            filter: { type: { eq: REGULAR } }
          ) {
            count
          }
        }
        ... on GraphGeneric {
          name
          ...GenericNames
          ...GenericDescriptions
          entityType
          coverImage {
            ...SafeImage
          }
        }
        ... on GraphContent {
          publishingType
          original
          status
          runnings {
            localization {
              country {
                code
              }
            }
            from {
              year
              month
              day
            }
            to {
              year
              month
              day
            }
          }
          releaseDate {
              year
              month
              day
            }
        }
        ... on WithMaturityRating {
          ...MaturityRatingFull
        }
        ... on WithRegionRestriction {
          ...RegionRestrictionFull
        }
        # ... on WithGenre {
        #   genres {
        #     names {
        #       text
        #       localization {
        #         language {
        #           code
        #         }
        #         script {
        #           code
        #         }
        #       }
        #     }
        #   }
        # }
      }
      resultTotal
    }
  }
  ${Generic.Fragments.safeImage}
  ${Generic.Fragments.names}
  ${Generic.Fragments.descriptions}
  ${Core.Fragments.withMaturityRatingFull}
  ${Core.Fragments.withRegionRestrictionFull}
  ${Core.Fragments.textWithLocalization}
  `;

export default performSearch;
