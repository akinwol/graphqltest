const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();


// allow cross-origin-requests 
app.use(cors())
mongoose.connect('mongodb://tobstest:testing123@ds339458.mlab.com:39458/gqltest');
mongoose.connection.once('open', () => {
    console.log('connected to database')
})


// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema, //defining types and object types in the Graph not your db schema 
    graphiql: true // this lets you use the qraphiql tool to let you use the tool 
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
