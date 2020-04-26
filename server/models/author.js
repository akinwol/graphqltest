const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
})

module.exports = mongoose.model('Author', authorSchema)
//name of the model will be book and it will be based on the bookSchema