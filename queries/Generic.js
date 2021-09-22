import { gql } from '@apollo/client';
import Core from '@/queries/Core'

const Generic = {};

Generic.Fragments = {
    names: gql`
    fragment GenericNames on GraphGeneric {
        names {
        ...TextWithLocalization
      }
    }
    ${Core.Fragments.textWithLocalization}`,
    descriptions: gql`
    fragment GenericDescriptions on GraphGeneric {
        descriptions {
        ...TextWithLocalization
      }
    }
    ${Core.Fragments.textWithLocalization}`,
    images: gql`
    fragment GenericImages on Generic {
        images {
            id
            type
            image {
                files {
                    format
                    publicUri
                }
            }
            ageRatings {
                age
            }
        }
    }`,
    safeImage: gql`
    fragment SafeImage on Image {
        url
        annotations {
          safeSearch {
            adult
            juvenile
          }
        }
    }`,
}

export default Generic;