import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noCover from "../../public/images/noCover.jpg";
import { setBook, openBookModal, closeBookModal } from '../../actions/searchActions';


class SearchResult extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  chooseBook = (book) => {
   this.props.setBook(book);
   this.props.openBookModal();
  }

  render(){
    console.log('props', this.props)
    const book = this.props.result.volumeInfo;
    const trimmedDescription = book.description ? book.description.substring(0, 150) : "no description here";
    console.log(trimmedDescription);
    return(
      <div className="searchResultsContainer">
        <div className="searchResultBookImage">
          <img className="searchResultThumbnail" src={book.imageLinks ? book.imageLinks.smallThumbnail: noCover} alt={book.title} />
        </div>
        <div className="searchResultBookInfo">
          <h1><span> Title: </span> {book.title ? book.title : "This book has no title"} </h1>
          <h1><span> Author: </span> {book.authors ? book.authors.join(', '): "Author unknown"}</h1>
          <h1><span> Published: </span> {book.publishedDate? moment(book.publishedDate).format("MMMM DD, YYYY") : "Publish date unknown"} </h1>
          <p><span> Description: </span> {trimmedDescription}...</p>
          <Button onClick={() => this.chooseBook(this.props.result)} > View more </Button>
        </div>
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    fetchingData: state.search.fetchingData,
    input: state.search.input,
    openSearchModal: state.search.openSearchModal,
    openBookModal: state.search.openBookModal,
    searchValue: state.search.searchValue,
    singleBook: state.search.singleBook,
    searchResult: state.search.searchResult,
    error: state.search.error
  }
}

export default connect(mapStateToProps, {setBook, openBookModal, closeBookModal})(SearchResult);
