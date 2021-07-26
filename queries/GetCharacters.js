
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
                        # ...GenericProfileImage
                        ...GenericNames
                    }
                }
            }
        }
    }
    }
    ${Generic.Fragments.names}
`

//     ${Generic.Fragments.profileImage}

export default GetCharacters