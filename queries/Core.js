import { gql } from '@apollo/client';

const Core = {}

Core.Fragments = {
  withMaturityRatingFull: gql`
    fragment MaturityRatingFull on WithMaturityRating {
      maturityRatings {
        country {
          code
        }
        age
        name
      }
    }
  `,
  withRegionRestrictionFull: gql`
    fragment RegionRestrictionFull on WithRegionRestriction {
      regionRestrictions {
        name
      }
    }
  `,
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
    }
  `,
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
    }
  `
}

export default Core
