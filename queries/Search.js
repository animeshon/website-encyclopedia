import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'


export const performSearch = () => gql` query searchFulltext(
    $search: String!, 
    $first: Int!, 
    $offset: Int!, 
    $filter: SearchFulltextFilterInput, 
    $order: SearchSortInput!) {
      searchFulltext(query:$search, first: $first, offset: $offset, filter: $filter, order: $order) {
        res : results {
            __typename
            ... on Metadata {
              id
            }
            ... on GraphConvention {
              from
              to
            }
            ... on GraphOrganization {
              foundation
              organizationType: type
            }
            # ... on GraphGameRelease {
            #   isPatch
            #   isFree
            #   gameReleaseType: type
            # }
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
                from
                to
              }
              releaseDate
            }
            ... on WithGenre {
              genres {
                names {
                  ...TextWithLocalization
                }
              }
            }
            ... on WithMaturityRating {
              ...MaturityRatingFull
            }
            ... on WithRegionRestriction {
              ...RegionRestrictionFull
            }

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
