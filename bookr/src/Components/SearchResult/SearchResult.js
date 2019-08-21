import React from 'react';
import moment from 'moment';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import noCover from "../../public/images/noCover.jpg";
import { setBook, openBookModal, closeBookModal } from '../../actions/searchActions';
import { BOOK_EXIST_CHECK } from '../../graphQL/queries';
import { ADD_BOOK_MUTATION } from '../../graphQL/mutations';
import ApolloClient from "apollo-boost";


class SearchResult extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      error: ''
    }
  }

  checkIfBookExist = async (book_api_id) => {
     const idToken = localStorage.getItem("token");
    const client = new ApolloClient({
      // uri: "https://bookr-back-end.herokuapp.com/",
      uri: "http://localhost:9090/",
      headers: { authorization: idToken }
    });
    try {
      const bookCheck = await client.query({query: BOOK_EXIST_CHECK});
      const filteredBook = bookCheck.data.getBooks.some(book => {
        return book.book_api_id === book_api_id
      })
      return filteredBook;
    }
    catch (error) {
      this.setState({
        error: 'Unable to check book in database'
      })
    }
  }

  chooseBook = async(book) => {
    const bookInfo = {
      title: book.volumeInfo ? book.volumeInfo.title: "No title",
      author: book.volumeInfo && book.volumeInfo.authors ? book.volumeInfo.authors.join(', '): "Author unknown",
      publisher: book.volumeInfo ? book.volumeInfo.publisher : "Publisher Unknown",
      publish_date: book.volumeInfo && book.volumeInfo.publishedDate ? moment(book.volumeInfo.publishedDate).format("MMMM DD, YYYY") : null,
      image: book.volumeInfo.imageLinks? book.volumeInfo.imageLinks.smallThumbnail :"No Image",
      book_api_id: book.id,
      category: book.volumeInfo.categories ? book.volumeInfo.categories.join(', '): "Category Unknown",
      description: book.volumeInfo ? book.volumeInfo.description : "This book has no description",
      list_price: book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount : null
    }
    const checkBook = await this.checkIfBookExist(book.id)
    if (!checkBook){
      this.addBook(bookInfo)
      this.props.setBook(book);
      this.props.openBookModal();

    } else {
      this.props.setBook(book);
      this.props.openBookModal();
    }
  }

  addBook = book => {
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090/",
      headers: { authorization: token }
    });
    client
      .mutate({
        mutation: ADD_BOOK_MUTATION,
        variables: {
          input: book
        }
      })
      .then(response => {
        return
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidUpdate(prevState, prevProps){
    if (prevState.error !== this.state.error){
      setTimeout(() => this.setState({error: ''}), 9000);
    }
  }

  componentWillUnmount(){
    setTimeout(() => this.setState({error: ''}), 9000);
  }


  render(){
    const book = this.props.result.volumeInfo;
    const trimmedDescription = book.description ? book.description.substring(0, 150) : "no description here";
    return(
      <div className="searchResultsContainer">
        {this.state.error && <div className="bookError"><h1> {this.state.error}</h1></div>}
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
