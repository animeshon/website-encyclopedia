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
            localizationTag
        }
        fallbacks {
            text
            localizationTag
        }
    }`
}

export default Core;