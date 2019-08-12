import React from 'react';

class Book extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      rating: null,
      review: ''
    }
  }

  render(){
    console.log(this.props.location.state.book)
    const book = this.props.location.state.book
    const bookDescription = book.description ? book.description : "This book has no description"
    return(
      <div className="individualBook">
        <div className="oneBook">
          <img className="individualBookImage" src={book.image} alt={book.title} />
          <h1><span>Title:</span> {book.title} </h1>
          <h1><span>Author:</span> {book.author} </h1>
          <h1><span>Publisher:</span> {book.publisher} </h1>
          <h1><span>List Price:</span> {book.list_price}</h1>
          <div className="bookDescription">
            <h1> <span> Description:</span>{bookDescription}</h1>
          </div>
        </div>
      </div>
    )
  }
}

export default Book;
