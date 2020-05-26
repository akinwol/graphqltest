import { gql } from 'apollo-boost'


const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`;
const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`;
const addBookMutation = gql`
# the stuff in the () are the variables you want to pass to your mutation - these are query variables 
# $ this sign lets you say that this is a query variable
mutation($name:String!,$genre:String!, $authorId:ID!){
    addBook(name:$name, genre:$genre, authorId:$authorId){
        name
        id
    }
}
`;

const getBookQuery = gql`
query($id:String){
    book(id:$String){
        id
        name
        genre
        author{
            id
            name
            age
            books{
                name
                id
            }
        }
    }
}
`;



export {
    getAuthorsQuery,
    getBooksQuery,
    addBookMutation,
    getBookQuery
}