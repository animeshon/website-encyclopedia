
import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';
import Canonizable from '@/queries/Canonizable';
import Content from '@/queries/Content';

const GetSummary = () => gql`
    query details($id: String!) {
        result: getGraphGeneric(name:$id) {
            name
            ... on GraphPerson {
                personLanguages: languages {
                    alpha2
                    code
                }
                personNationalities: nationalities {
                    code
                }
                voiceActings {
                    isPrimary
                    voiced {
                        ... on GraphCharacter {
                            name
                            appearancesAggregate(
                                filter: { relation: { eq: MAIN } }
                            ) {
                                count
                            }
                        }
                    }
                }
                birthday {
                    year
                    month
                    day
                }
                gender
                bloodType
            }
            ... on GraphCharacter {
                birthday {
                    year
                    month
                    day
                }
                gender
                bloodType
                guiseOf {
                    name
                    entityType
                    ...GenericNames
                }
            }
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
            ... on GraphUniverse {
                canonicals(first: 5) {
                    name
                    entityType
                    ...GenericNames
                }
                universeContents: contents(first: 50) {
                    ... on Starring {
                        starring(filter: { relation: { eq: MAIN } }) {
                            character {
                                name
                                entityType
                                ...GenericNames
                            }
                        }
                    }
                }
                contentsAggregate {
                    count
                }
                canonicalsAggregate {
                    count
                }
            }
            ... on GraphCanonical {
                partOfUniverses(first: 5) {
                    name
                    entityType
                    ...GenericNames
                }
                canonicalContents: contents(first: 50) {
                    ... on Starring {
                        starring(filter: { relation: { eq: MAIN } }) {
                            character {
                                name
                                entityType
                                ...GenericNames
                            }
                        }
                    }
                }
                contentsAggregate {
                    count
                }
                partOfUniversesAggregate {
                    count
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
            ... on GraphGameRelease {
                widthResolution
                heightResolution
                isPatch
                isFree
                gameReleaseType: type
                voicedDegree
                animationStoryDegree
                animationEroDegree
                engine
                platforms
            }
            ... on Release {
                releaseLanguage: languages {
                    alpha2
                    code
                }
                releaseContents: contents {
                    ... on GraphGeneric {
                        ...ContentMinimal
                    }
                }
                asin
                gtin
            }
            ... on GraphVisualNovel {
                visualNovelLength: length
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
            ... on GraphAnime {
                animeType: type
                animeEpisodeCount: episodeCount
                animeEpisodeAggregate: episodesAggregate(
                    filter: { type: { in: [REGULAR, RECAP] } }
                ) {
                    count
                }
            }
            ... on GraphGeneric {
                ...GenericNames
                ...GenericDescriptions
                entityType
                crossrefs {
                    externalID
                    namespace
                    website {
                        formattedAddress
                    }
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
            ... on WithGenre {
                genres {
                    names {
                        ...TextWithLocalization
                    }
                }
            }
            ... on Starring {
                starring(first: 5, filter: { relation: { eq: MAIN } }) {
                    character {
                        name
                        ... on GraphCharacter {
                            coverImage {
                                ...SafeImage
                            }
                            ...GenericNames
                        }
                    }
                }
            }
            ... on Release {
                reelaseShops: shops {
                    url
                    isGlobal
                    name
                }
            }
            ... on Releasable {
                releasableShops: shops {
                    url
                    isGlobal
                    name
                }
            }

            ... on WithMaturityRating {
                ...MaturityRatingFull
            }
            ... on WithRegionRestriction {
                ...RegionRestrictionFull
            }

            # ...CanonizableUniversesSummary
            # ...CanonizableCanonicalsSummary
        }
    }

    ${Generic.Fragments.names}
    ${Generic.Fragments.descriptions}
    ${Core.Fragments.withMaturityRatingFull}
    ${Core.Fragments.withRegionRestrictionFull}
    ${Core.Fragments.textWithLocalization}
    ${Content.Fragments.contentMinimal}
    ${Generic.Fragments.safeImage}
`;

// ${Canonizable.Fragments.universesSummary}
// ${Canonizable.Fragments.canonicalsSummary}
// ${Generic.Fragments.profileImage}
//     

export default GetSummary