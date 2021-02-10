import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';
import Content from '@/queries/Content';

const Canonizable = {};

Canonizable.Fragments = {
    universesSummary: gql`
    fragment CanonizableUniversesSummary on Canonizable {
        partOfUniverses {
            id
            __typename
            ...GenericNames
      }
    }
    ${Generic.Fragments.names}`
    ,
    canonicalsSummary: gql`
    fragment CanonizableCanonicalsSummary on Canonizable {
        partOfCanonicals {
            id
            ... on Generic {
                ...GenericProfileImage
                ...GenericNames
            }
            # ... on WithRestriction {
            #     ...RestrictionFull
            # }
            # ... on WithAgeRating {
            #     ...AgeRatingFull
            # }
        }
    }
    ${Core.Fragments.textWithLocalization}
    ${Generic.Fragments.names}
    ${Generic.Fragments.profileImage}`
    ,
    canonicals: gql`
    fragment CanonizableCanonicals on Canonizable {
        partOfCanonicals {
            id
            ... on Generic {
                ...GenericProfileImage
                ...GenericNames
                ...GenericDescriptions
            }
            # ... on WithRestriction {
            #     ...RestrictionFull
            # }
            # ... on WithAgeRating {
            #     ...AgeRatingFull
            # }
            contents (first: $firstContents) {
                ...ContentMinimal
            }
        }
    }
    ${Core.Fragments.textWithLocalization}
    ${Generic.Fragments.names}
    ${Generic.Fragments.descriptions}
    ${Generic.Fragments.profileImage}
    ${Core.Fragments.withAgeRatingFull}
    ${Core.Fragments.withRestrictionFull}
    ${Content.Fragments.contentMinimal}
    `,
    universes: gql`
    fragment CanonizableUniverses on Canonizable {
        partOfUniverses {
            id
            ... on Generic {
                ...GenericProfileImage
                ...GenericNames
                ...GenericDescriptions
            }
            # ... on WithRestriction {
            #     ...RestrictionFull
            # }
            # ... on WithAgeRating {
            #     ...AgeRatingFull
            # }
            contents (first: $firstContents) {
                ...ContentMinimal
            }
        }
    }
    ${Core.Fragments.textWithLocalization}
    ${Generic.Fragments.names}
    ${Generic.Fragments.descriptions}
    ${Generic.Fragments.profileImage}
    ${Core.Fragments.withAgeRatingFull}
    ${Core.Fragments.withRestrictionFull}
    ${Content.Fragments.contentMinimal}
    `,
}

Canonizable.Queries = {
    canonicals: gql`
        query canonicals($id: String!, $firstContents: Int!) {
            result: getMetadata(id: $id) {
                id
                ... on Canonizable {
                    ...CanonizableCanonicals
                }
            }
        }
        ${Canonizable.Fragments.canonicals}
    `,
    universes: gql`
    query universes($id: String!, $firstContents: Int!) {
        result: getMetadata(id: $id) {
            id
            ... on Canonizable {
                ...CanonizableUniverses
            }
        }
    }
    ${Canonizable.Fragments.universes}
    `
}

export default Canonizable;