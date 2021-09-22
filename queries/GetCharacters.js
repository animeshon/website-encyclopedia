
import { gql } from '@apollo/client';
import Generic from '@/queries/Generic'

const GetCharacters = () => gql`
    query details($id: String!) {
        result : get(id:$id) {
        id
        ... on Starring {
            starring {
                relation
                character {
                    __typename
                    ... on GraphCharacter {
                        id
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