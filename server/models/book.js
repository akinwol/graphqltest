const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String, 
    genre: String,
    authorId: String
})

module.exports = mongoose.model('Book', bookSchema)
//name of the model will be book and it will be based on the bookSchema