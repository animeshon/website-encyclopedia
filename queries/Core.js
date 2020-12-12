import { gql } from '@apollo/client';

const Core = {};

Core.Fragments = {
    withAgeRatingFull: gql`
    fragment AgeRatingFull on WithAgeRating {
        ageRatings {
            country {
                code
            }
            age
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
    fragment TextWithLocalization on Text {
        text
        localization {
            language {
                code
            }
            script {
                code
            }
        }
    }`
}

export default Core;