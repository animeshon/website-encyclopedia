import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const Content = {};

// ! all aggregate functions seems to have some problem resolving an inner node
// ! It works only if the aggregation compares in the last fragment of the query.
// ! Any successive fragment's result gets overwriten
// ! Dgraph 21.03.01

Content.Fragments = {
    contentMinimal: gql`
    fragment ContentMinimal on Metadata {
        __typename
        ...on Metadata {
            id
        }
        ... on GraphVisualNovel {
            visualNovelLength: length
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

        ... on WithMaturityRating {
            ...MaturityRatingFull
        }
        ... on WithRegionRestriction {
            ...RegionRestrictionFull
        }

        ... on GraphLightNovel {
            lightNovelChapterCount: chapterCount
            # lightNovelChapterAggregate: chaptersAggregate(
            #     filter: { type: { eq: REGULAR } }
            # ) {
            #     count
            # }
        }
        ... on GraphGraphicNovel {
            graphicNovelType: type
            graphicNovelChapterCount: chapterCount
            # graphicNovelChapterAggregate: chaptersAggregate(
            #     filter: { type: { eq: REGULAR } }
            # ) {
            #     count
            # }
        }
        ... on GraphAnime {
            animeType: type
            animeEpisodeCount: episodeCount
            # animeEpisodeAggregate: episodesAggregate(
            #     filter: { type: { in: [REGULAR, RECAP] } }
            # ) {
            #     count
            # }
        }
    }
    ${Generic.Fragments.safeImage}
    ${Core.Fragments.textWithLocalization}
    ${Generic.Fragments.names}
    ${Generic.Fragments.descriptions}
    ${Core.Fragments.withMaturityRatingFull}
    ${Core.Fragments.withRegionRestrictionFull}
    `,
}

export default Content;