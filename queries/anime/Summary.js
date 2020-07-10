import gql from 'graphql-tag';

const getAnimeSummary = id => gql`
    {
        queryAnime(filter: { id: { eq: "${id}" } }) {
            names {
                text
                localization {
                    id
                }
            }
            description {
                text
                localization(filter: { id: { eq: "en-US" } }) {
                    id
                }
            }
            starring(first: 5) {
                character {
                    ... on Character {
                        images(first: 1) {
                            type
                            image {
                                file {
                                    publicUri
                                }
                            }
                        }
                        id
                        names {
                            text
                            localization(filter: { id: { eq: "en-US" } }) {
                                id
                            }
                        }
                    }
                }
            }
            episodes {
                id
            }
            status
            genres {
                names {
                    text
                }
            }
            distributions {
                from {
                    datetime
                }
                to {
                    datetime
                }
            }
            images(first: 1) {
                type
                image {
                    file {
                        publicUri
                    }
                }
            }
        }
    }
`;

// excluded fields that cause issues
// **********************
// ageRatings {
//   age
// }

export default getAnimeSummary;
