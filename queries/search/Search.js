import gql from 'graphql-tag';

const performSearch = searchTerm => gql`
    {
        queryManga(first: 5) @cascade {
            __typename
            id
            description {
                text
                localization {
                    id
                }
            }
            names @cascade {
                text
                localization(filter: { id: { eq: "en-US" } }) {
                    id
                }
            }
            images(first: 1) {
                image {
                    file {
                        publicUri
                    }
                }
            }
            volumes(first: 2) {
                id
                images(first: 1) {
                    image {
                        file {
                            publicUri
                        }
                    }
                }
                description {
                    text
                    localization {
                        id
                    }
                }
                names @cascade {
                    text
                    localization(filter: { id: { eq: "en-US" } }) {
                        id
                    }
                }
            }
        }
        queryAnime(filter: { id: { eq: "U8MXKO" } }) {
            __typename
            id
            type
            description {
                text
                localization {
                    id
                }
            }
            names @cascade {
                text
                localization(filter: { id: { eq: "en-US" } }) {
                    id
                }
            }
            images(first: 1) {
                image {
                    file {
                        publicUri
                    }
                }
            }
            episodes(first: 2) {
                id
                images(first: 1) {
                    image {
                        file {
                            publicUri
                        }
                    }
                }
                description {
                    text
                    localization {
                        id
                    }
                }
                names @cascade {
                    text
                    localization(filter: { id: { eq: "ANSI-Z39-11" } }) {
                        id
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

export default performSearch;
