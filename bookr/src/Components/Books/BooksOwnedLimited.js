import React from 'react';

const BooksOwnedLimited = (props)=> {
  return(
    <div className="booksOwned">
      <img src={props.book.book_id.image} alt={props.book.book_id.title}/>
      <h1>{props.book.book_id.title}</h1>
      <h2>{props.book.book_id.author}</h2>
    </div>
  )
}

export default BooksOwnedLimited;
