import React from 'react';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import noCover from "../../public/images/noCover.jpg";

class SearchResult extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  chooseBook = (book) => {
    console.log('this book', book)
  }

  render(){
    console.log(this.props)
    const book = this.props.result.volumeInfo;
    const trimmedDescription = book.description ? book.description.substring(0, 150) : "no description here";
    console.log(trimmedDescription);
    return(
      <div className="searchResultsContainer">
        <div className="searchResultBookImage">
          <img className="searchResultThumbnail" src={book.imageLinks ? book.imageLinks.smallThumbnail : noCover} alt={book.title} />
        </div>
        <div className="searchResultBookInfo">
          <h1> Title: {book.title ? book.title : "This book has no title"} </h1>
          <h1> Author: {book.authors ? book.authors.join(', '): "Author unknown"}</h1>
          <h1> Published: {book.publishedDate? moment(book.publishedDate).format("MMMM DD, YYYY") : "Publish date unknown"} </h1>
          <p> Description: {trimmedDescription}</p>
          <Button onClick={() => this.chooseBook(this.props.result)} > View this book </Button>
        </div>
      </div>
    )
  };
};

export default SearchResult;
