import { gql } from '@apollo/client';
import Core from '@/queries/Core'

const Generic = {};

Generic.Fragments = {
    names: gql`
    fragment GenericNames on Generic {
        names {
        ...TextWithLocalization
      }
    }
    ${Core.Fragments.textWithLocalization}`,
    descriptions: gql`
    fragment GenericDescriptions on Generic {
        descriptions @cascade {
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
    profileImage: gql`
    fragment GenericProfileImage on Generic {
        images(first: 1, filter: {type: {eq: PROFILE}}) {
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
}

export default Generic;