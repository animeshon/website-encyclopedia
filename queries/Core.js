import { gql } from '@apollo/client';

const Core = {};

Core.Fragments = {
    withMaturityRatingFull: gql`
    fragment MaturityRatingFull on WithMaturityRating {
        maturityRatings {
            country {
                code
            }
            age
            tag
        }
    }`,
    withRegionRestrictionFull: gql`
    fragment RegionRestrictionFull on WithRegionRestriction {
        regionRestrictions {
            tag
        }
    }`,
    localizationCodeAlpha2: gql`
    fragment CodeAlpha2 on Localization {
        tag
        language {
            code
            alpha2
        }
        country {
            code
            alpha2
        }
    }`,
    textWithLocalization: gql`
    fragment TextWithLocalization on LocalizedTextPayload {
        hits {
            text
            localization {
                language {
                    code
                }
                script {
                    code
                }
            }
        }
        fallbacks {
            text
            localization {
                language {
                    code
                }
                script {
                    code
                }
            }
        }
    }`
}

export default Core;