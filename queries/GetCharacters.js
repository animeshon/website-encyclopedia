
import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const GetCharacters = () => gql`
    query details($id: String!) {
        result : getGraphGeneric(name:$id) {
        name
        ... on Starring {
            starring {
                relation
                character {
                    __typename
                    ... on GraphCharacter {
                        name
                        coverImage {
                            ...SafeImage
                        }
                        ...GenericNames
                    }
                }
            }
        }
    }
    }
    ${Generic.Fragments.safeImage}
    ${Generic.Fragments.names}
`

export default GetCharacters