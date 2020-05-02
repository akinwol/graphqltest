import React,{useState} from 'react';
import { useQuery,useMutation } from '@apollo/react-hooks'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../Queries/Queries'




function AddBook() {
    const { loading, data } = useQuery(getAuthorsQuery);
    const [addBook, { data:BookAddedData,error }] = useMutation(addBookMutation);
    const [formValues, setFormValue] = useState({
        name: '',
        genre: '',
        authorId: ''
    })
    const displayAuthors = () => {
        if (loading) {
            return (<option disabled>Loading Authors </option>)
        } else {
            return data.authors.map(author => {
                return (
                    <option
                        key={author.id}
                        value={author.id}
                    >
                        {author.name}
                    </option>
                )
            })
        }
    }
    const submitForm = (e) => {
        e.preventDefault()
        addBook({
            variables: { ...formValues },
            refetchQueries: [{ query: getBooksQuery}]
        })
        //console.log({ BookAddedData, error})
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e)=> setFormValue({...formValues,name: e.target.value})}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setFormValue({ ...formValues, genre: e.target.value })}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setFormValue({ ...formValues, authorId: e.target.value })}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook