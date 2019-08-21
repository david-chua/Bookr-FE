import React from 'react';
import { Link } from 'react-router-dom';

class AllBooksPerCategory extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const book = this.props.book.book_id;
    return(
      <div className="booksOwned allBooks">
      <Link to={{
        pathname: `/book/${book.book_api_id}`,
        state:{
          book: book,
        }
      }}><img src={book.image} alt={book.title} /></Link>
        <h1> {book.title} </h1>
        <h2> {book.author} </h2>
      </div>
    )
  }
}

export default AllBooksPerCategory;
