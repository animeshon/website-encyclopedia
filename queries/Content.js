import { gql } from '@apollo/client';
import Core from '@/queries/Core'
import Generic from '@/queries/Generic'

const Content = {};

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
        # ... on GraphLightNovel {
        #     lightNovelChapterCount: chapterCount
        #     lightNovelChapterAggregate: chaptersAggregate(
        #         filter: { type: { eq: REGULAR } }
        #     ) {
        #         count
        #     }
        # }
        ... on GraphGraphicNovel {
            graphicNovelType: type
            # graphicNovelChapterCount: chapterCount
            # graphicNovelChapterAggregate: chaptersAggregate(
            #     filter: { type: { eq: REGULAR } }
            # ) {
            #     count
            # }
        }
        ... on GraphAnime {
            animeType: type
            # animeEpisodeCount: episodeCount
            # animeEpisodeAggregate: episodesAggregate(
            #     filter: { type: { in: [REGULAR, RECAP] } }
            # ) {
            #     count
            # }
        }
        ... on GraphGeneric {
            ...GenericNames
            ...GenericDescriptions
            entityType
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
    }
    ${Core.Fragments.textWithLocalization}
    ${Generic.Fragments.names}
    ${Generic.Fragments.descriptions}
    ${Core.Fragments.withMaturityRatingFull}
    ${Core.Fragments.withRegionRestrictionFull}
    `,
}

//     ${Generic.Fragments.profileImage}

export default Content;