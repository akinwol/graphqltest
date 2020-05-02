import React, {useState} from 'react';
import BookDetails from './BookDetails'
import { useQuery } from '@apollo/react-hooks'
import {getBooksQuery} from '../Queries/Queries'



function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selected, setSelected] = useState(null)
    // console.log({loading,data,error})

   
    const displayBooks = () => {
        if (loading) {
            return (<div>Loading Books </div>)
        } else {
            return data.books.map(book => {
                return (
                    <li key={book.id} onClick={(e)=>{setSelected(book.id)}}> {book.name}</li>
                )
            })
        }
      }
    return (
        <div >
            <ul id='book-list'>
               {displayBooks()}

            </ul>
            <BookDetails bookId={selected}/>

        </div>
    );
}

export default BookList;
