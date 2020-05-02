import React from 'react';
import BookList from './Components/BookList'
import AddBook from './Components/AddBook'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

// apollo client setup 

const client = new ApolloClient({
  uri: 'http://127.0.0.1:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id='main'>
        <h1> Reading List </h1>
        <BookList />
        <AddBook />

      </div>
    </ApolloProvider>

  );
}

export default App;
