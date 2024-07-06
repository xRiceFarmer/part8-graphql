import { gql} from "@apollo/client";
export const ALL_AUTHORS = gql`
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`
export const ALL_BOOKS = gql`
    query allBooks($author: String, $genre: String){
        allBooks(author: $author, genre: $genre){
            title
            author
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]){
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ){
            title
            author
            published
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $born: Int!){
        editAuthor(
            name: $name
            setBornTo: $born
        ){
            name
            born
            bookCount
        }
    }
`
export const LOGIN = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password){
            value
        }
    }
`
export const ALL_GENRES = gql`
    query {
        allGenres
    }
`