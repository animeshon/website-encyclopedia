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
                    }
                }
                character {
                    __typename
                    ... on Character {
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
