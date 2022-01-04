import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';

const GetVoices = () => gql`
    query details($id: String!) {
        result : getGraphGeneric(name:$id) {
            name
            ... on Audible {
                voiceActings {
                    isPrimary
                    localization {
                        name
                        ...CodeAlpha2
                    }
                    actor {
                        gender
                        name
                        ...GenericNames
                        coverImage {
                         ...SafeImage
                        }
                    }
                    voiced {
                        __typename
                        ... on GraphGeneric {
                            name
                        }
                    }
                }
            }
        }
    }
    ${Generic.Fragments.safeImage}
    ${Core.Fragments.localizationCodeAlpha2}
    ${Generic.Fragments.names}
`;

export default GetVoices