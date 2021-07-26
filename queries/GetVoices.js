import { gql } from '@apollo/client';
import Core from '@/queries/Core';
import Generic from '@/queries/Generic';

const GetVoices = () => gql`
    query details($id: String!) {
        result : get(id:$id) {
            id
            ... on Audible {
                voiceActings {
                    isPrimary
                    localization {
                        id
                        ...CodeAlpha2
                    }
                    actor {
                        gender
                        id
                        ...GenericNames
                        # ...GenericProfileImage
                    }
                    voiced {
                        __typename
                        ... on Metadata {
                            id
                        }
                    }
                }
            }
        }
    }
    ${Core.Fragments.localizationCodeAlpha2}
    ${Generic.Fragments.names}
`;

//     ${Generic.Fragments.profileImage}

export default GetVoices