
import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';
import Canonizable from '@/queries/Canonizable';
import Content from '@/queries/Content';

const GetSummary = () => gql`
    query details($id: String!) {
        result: get(id: $id) {
            id
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
                            id
                            appearancesAggregate(
                                filter: { relation: { eq: MAIN } }
                            ) {
                                count
                            }
                        }
                    }
                }
                personBirthDay: birthday
                personGender: gender
                personBloodType: bloodType
            }
            ... on GraphCharacter {
                characterBirthDay: birthday
                characterGender: gender
                characterBloodType: bloodType
                age
                ageType
                guiseOf {
                    id
                    entityType
                    ...GenericNames
                }
            }
            ... on GraphConvention {
                from
                to
            }
            ... on GraphUniverse {
                canonicals(first: 5) {
                    id
                    entityType
                    ...GenericNames
                }
                universeContents: contents(first: 50) {
                    ... on Starring {
                        starring(filter: { relation: { eq: MAIN } }) {
                            character {
                                id
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
                    id
                    entityType
                    ...GenericNames
                }
                canonicalContents: contents(first: 50) {
                    ... on Starring {
                        starring(filter: { relation: { eq: MAIN } }) {
                            character {
                                id
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
                foundation
                contentFocus
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
                releaseReleaseLanguage: languages {
                    alpha2
                    code
                }
                releaseContents: contents {
                    ... on Metadata {
                        ...ContentMinimal
                    }
                }
                censorship
                ean10
                ean13
                sku
                upce
                upca
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
            ... on Starring {
                starring(first: 5, filter: { relation: { eq: MAIN } }) {
                	id
                    character {
                        id
                        ... on GraphCharacter {
                            # ...GenericProfileImage
                            ...GenericNames
                        }
                    }
                }
            }
            ... on Release {
                reelaseShops: shops {
                    url
                    isGlobal
                    country {
                        code
                    }
                }
            }
            ... on Releasable {
                releasableShops: shops {
                    url
                    isGlobal
                    country {
                        code
                    }
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
`;

// ${Canonizable.Fragments.universesSummary}
// ${Canonizable.Fragments.canonicalsSummary}
// ${Generic.Fragments.profileImage}
//     

export default GetSummary