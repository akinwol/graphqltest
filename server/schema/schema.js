const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book')
const Author = require('../models/author')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull // this is to let us know that a certain field is required
} = graphql;

// dummy data
// var books = [
//     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
//     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
//     { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
//     { name: 'Truth', genre: 'Fantasy', id: '4', authorId: '2' },
//     { name: 'Long Yard', genre: 'Fantasy', id: '5', authorId: '2' },
//     { name: 'Finale', genre: 'Sci-Fi', id: '6', authorId: '3' },
// ];


// var authors = [
//     { name: 'Patrick Ruthfus', age: 44, id: '1' },
//     { name: 'Brandon Sanderson', age: 42, id: '2' },
//     { name: 'Terry Patchett', genre: 66, id: '3' },
// ];
const BookType = new GraphQLObjectType({ //this function defines what the object is about
    name: 'Book', // the name of the object
    fields: () => ({ // this function returns the object below - must need to be a function because different types can reference each other
        id: { type: GraphQLID }, //can use Graphql string here too but id will let you query with both string or not
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //resolve function here does the same thing it does in the root queries below 
                //when you have nested information you already have the parent data which is the book 
                //return _.find(authors, { id: parent.authorId }) //finding an author with the author id of the parent 
                return Author.findById(parent.authorId)
            }
        }
    })
});
const AuthorType = new GraphQLObjectType({ //this function defines what the object is about
    name: 'Author',
    fields: () => ({ // this function returns the object below
        id: { type: GraphQLID }, //can use Graphql string here too but id will let you query with both string or not
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            //this is not just  a single book so need to tell graphql its a list of book types
            type: new GraphQLList(BookType), //creating a new list of Book types
            resolve(parent, args) {
                //return _.filter(books, { authorId: parent.id })
                return Book.find({authorId:parent.id})
            }
        }
    })
});

//need a way to for graphql to know books and authors are related 

const RootQuery = new GraphQLObjectType({
    // rootqueries are how you initially jump into the graph to grab data
    name: 'RootQueryType',
    fields: { //don't need to wrap in a function here because order doesn't matter
        book: { //each field is what you  enter from, so you have book - name you enter from 
            type: BookType, //this param has been defined above - type of data you want to Query
            args: { id: { type: GraphQLID } },
            //when someone queries book type, they need to pass some arguments, this lets user pass this id
            resolve(parent, args) { //args are what are passed above 
                //parent is more for relationsships 
                // code to get data from db / other source
                // args lets you access the arguments that have been passed to the query 
                //return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //return _.find(authors, { id: args.id }); //looking through the authors array
            return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
               // return authors
                return Author.find({})
            }
        }
    }
});


//mutations allow us to modify data - add, delete, editing
//in graphql we need to define what data can be changed  
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, //adding nonNull so that you can't omit passing a name 
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({ //creating new instance of the mongoose Author from the model
                    name: args.name,
                    age: args.age
                }) 
                return author.save() //returning this gives you back what you just saved 
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }, //GraphQLNonNull ensures that a value is passed
                genre: { type: new GraphQLNonNull (GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({ //creating new instance of the mongoose Author
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery, //this is the query we have defined 
    mutation:Mutation 
});

//when making a query you would do it like this 
// {
//     authors{
//         name
//         id
//         books{
//             name
//         }
//     }
// }
// {
//     book(id: 1){
//         name
//         id
//         author{
//             name
//         }
//     }
// }

// mutation {
//     addBook(name: "Finale II", genre: "Fantasy", authorId: "5ea58884b1e61136183ce8f9"){
    // below is the data you want to recieve back when you create the data
//         name
//         genre
//     }
// }

