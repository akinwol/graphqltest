import React from 'react';
import { useQuery } from '@apollo/react-hooks'
import { getBookQuery } from '../Queries/Queries'

function BookDetails(props) {
    const { bookId } = props
    const { loading, error, data } = useQuery(getBookQuery, {
        variables: {
            id: bookId
        }
        // options: (props) => {
        //     return {
        //         variables: {
        //             id:bookId
        //         }
        //     }
        // }
    });
   
    console.log({ loading, data, error })


    // const displayBooks = () => {
    //     if (loading) {
    //         return (<div>Loading Books </div>)
    //     } else {
    //         return data.books.map(book => {
    //             return (
    //                 <li key={book.id}> {book.name}</li>
    //             )
    //         })
    //     }
    // }
    return (
        <div > 
            <ul id='book-details'>
                <p>Output Book details here </p>


            </ul>

        </div>
    );
}

export default BookDetails