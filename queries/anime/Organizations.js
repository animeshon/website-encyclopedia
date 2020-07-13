import gql from 'graphql-tag';

const getAnimeOrganizations = id => gql`
    {
        queryAnime(filter: { id: { eq: "${id}" } }) {
            id
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
                    ... on Organization {
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
                            localization {
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

export default getAnimeOrganizations;
