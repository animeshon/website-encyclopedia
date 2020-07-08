import gql from 'graphql-tag';

const getAnimeCast = id => gql`
    {
        queryAnime(filter: { id: { eq: "${id}" } }) {
            names @cascade {
                text
                localization(filter: { id: { eq: "en-US" } }) {
                    id
                }
            }
            voiceActings {
                actor {
                    gender
                    id
                    names {
                        text
                        localization {
                            id
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
                character {
                    __typename
                    ... on Character {
                        id
                        names {
                            text
                            localization {
                                id
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

export default getAnimeCast;
