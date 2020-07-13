import gql from 'graphql-tag';

const getAnimeEpisodes = id => gql`
    {
        queryAnime(filter: {id: {eq: "${id}"}}) {
            id
            names @cascade {
                text
                localization(filter: {id: {eq: "en-US"}}) {
                    id
                }
            }
            episodes {
                index
                videos(first: 1) {
                    video {
                        duration
                    }
                }
                id
                names @cascade {
                    text
                    localization {
                        id
                    }
                }
                description @cascade {
                    text
                    localization(filter: {id: {eq: "en-US"}}) {
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

export default getAnimeEpisodes;
