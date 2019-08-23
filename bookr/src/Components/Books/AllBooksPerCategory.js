import React from 'react';
import { Link } from 'react-router-dom';
import noCover from "../../public/images/noCover.jpg";

class AllBooksPerCategory extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const book = this.props.book.book_id;
    const bookImage = book.image !== "No Image"? book.image: noCover;
    return(
      <div className="booksOwned allBooks">
      <Link to={{
        pathname: `/book/${book.book_api_id}`,
        state:{
          book: book,
        }
      }}><img src={bookImage} alt={book.title} /></Link>
        <h1> {book.title} </h1>
        <h2> {book.author} </h2>
      </div>
    )
  }
}

export default AllBooksPerCategory;
