import gql from 'graphql-tag';

const getAnimeStaff = id => gql`
    {
        queryAnime(filter: { id: { eq: "${id}" } }) {
            names @cascade {
                text
                localization(filter: { id: { eq: "en-US" } }) {
                    id
                }
            }
            staff {
                localization {
                    id
                }
                collaborator {
                    __typename
                    ... on Person {
                        id
                        images(first: 1) {
                            image {
                                file {
                                    publicUri
                                }
                            }
                        }
                        names {
                            text
                            localization(filter: { id: { eq: "en-US" } }) {
                                id
                            }
                        }
                    }
                }
                role {
                    names @cascade {
                        text
                        localization(filter: { id: { eq: "en-US" } }) {
                            id
                        }
                    }
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

export default getAnimeStaff;
