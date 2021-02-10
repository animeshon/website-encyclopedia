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
        ... on Generic {
            ...GenericProfileImage
            ...GenericNames
            ...GenericDescriptions
        }
        ... on WithRestriction {
            ...RestrictionFull
        }
        ... on WithAgeRating {
            ...AgeRatingFull
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
    ${Core.Fragments.textWithLocalization}
    ${Generic.Fragments.names}
    ${Generic.Fragments.descriptions}
    ${Generic.Fragments.profileImage}
    ${Core.Fragments.withAgeRatingFull}
    ${Core.Fragments.withRestrictionFull}`,
}

export default Content;