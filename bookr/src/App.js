import  React, {useState} from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import ReactStars from 'react-stars';
import ApolloClient from "apollo-boost";
import Navigation from './Navigation/Navigation';
import Home from './Home';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Books from './Components/Books/Books';
import Book from './Components/Books/Book';
import BooksCategoryAll from './Components/Books/BooksCategoryAll';
import LogInOrRegister from "./Components/Auth/Login";
import SearchResult from "./Components/SearchResult/SearchResult";
import Footer from './Footer';
import noCover from "./public/images/noCover.jpg";
import {
  GET_CURRENT_USER_QUERY,
  BOOK_EXIST_CHECK,
  REVIEW_EXIST_BY_USER_ID,
  BOOK_OWNED_EXIST_IN_USER,
  BOOK_READ_EXIST_IN_USER,
  FAVORITE_BOOK_EXIST_IN_USER} from './graphQL/queries';
import { openModal, closeModal, openBookModal, closeBookModal } from './actions/searchActions';
import { addBook, successAdd } from './actions/bookActions';
import { addReview } from './actions/reviewActions';
import { addToOwn, addToRead, addToFavorite } from './actions/categoryActions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const token = localStorage.getItem("token");
  const client = new ApolloClient({
    uri: "https://bookr-back-end.herokuapp.com/",
    headers: { authorization: token}
  })
  client.query({ query: GET_CURRENT_USER_QUERY })
    .then(response => {
    })
    .catch(err => {
      localStorage.removeItem("token"); //If token expired or not valid, remove it
    });

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};



const App = (props) => {

  const handleShow = async () =>{
    await props.openModal()
  }

  const handleClose = async () => {
    await props.closeModal()
  }

  const handleBookClose = () => {
    props.closeBookModal()
  }

  const handleInputChange = e => {
      const {name, value} = e.target
      setValues({...values, [name]: value})
  }

  const ratingChange = newRating => {
    setValues({...values, "rating": newRating})
  }

  const [values, setValues] = useState({review: '', rating: 0})
  const [infoMessage, setInfoValues] = useState({message: "" })

  const checkIfBookExist = async (book_api_id) => {
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/"
    });
    try {
      const bookCheck = await client.query({query: BOOK_EXIST_CHECK});
      const filteredBook = bookCheck.data.getBooks.some(book => {
        return book.book_api_id === book_api_id
      })
      return filteredBook;
    }
    catch (error) {
      setInfoValues({message: "Unfortunately, I failed, please refresh. "})
      setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  const getExistingBook = async (book_api_id) => {
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/"
    });
    try {
      const bookCheck = await client.query({query: BOOK_EXIST_CHECK});
      const filteredBook = bookCheck.data.getBooks.filter(book => {
        return book.book_api_id === book_api_id
      })
      return filteredBook[0].id
    }
    catch (error) {
      setInfoValues({message: "Unfortunately, I failed, please refresh"})
      setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  const checkIfUserReviewed = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/"
    });
    try {
      const reviewCheck = await client.query({query: REVIEW_EXIST_BY_USER_ID, variables: {userId: user_id}});
      const filteredReview = reviewCheck.data.getReviewsByUserId.some(review => {
        return review.book_id.id === book_id
      })
      return filteredReview
    }
    catch (error){
      setInfoValues({message: "Unfortunately, I failed, please refresh"})
      setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  const addReview = async () => {
    console.log(props.singleBook.volumeInfo.publishedDate)
    const bookInfo = {
      title: props.singleBook.volumeInfo ? props.singleBook.volumeInfo.title: "No title",
      author: props.singleBook.volumeInfo && props.singleBook.volumeInfo.authors ? props.singleBook.volumeInfo.authors.join(', '): "Author unknown",
      publisher: props.singleBook.volumeInfo ? props.singleBook.volumeInfo.publisher : "Publisher Unknown",
      publish_date: props.singleBook.volumeInfo && props.singleBook.volumeInfo.publishedDate ? moment(props.singleBook.volumeInfo.publishedDate).format("MMMM DD, YYYY") : null,
      image: props.singleBook.volumeInfo.imageLinks? props.singleBook.volumeInfo.imageLinks.smallThumbnail :"No Image",
      book_api_id: props.singleBook.id,
      category: props.singleBook.volumeInfo.categories ? props.singleBook.volumeInfo.categories.join(', '): "Category Unknown",
      description: props.singleBook.volumeInfo ? props.singleBook.volumeInfo.description : "This book has no description",
      list_price: props.singleBook.saleInfo.retailPrice ? props.singleBook.saleInfo.retailPrice.amount : null
    }

    const initiateCheck = await checkIfBookExist(bookInfo.book_api_id);
    if (initiateCheck) {
      const bookId = await getExistingBook(bookInfo.book_api_id)
      const userId = props.currentUser.id
      if (values.rating && values.review){
        let newReview = {
          book_id: bookId,
          user_id: userId,
          rating: parseFloat(values.rating),
          content: values.review
        }
        const reviewCheck = await checkIfUserReviewed(userId, bookId);
        if (reviewCheck) {
        } else {
          props.addReview(newReview);
        }
      } else{
        setInfoValues({message: "You need to have a rating and a review."})
        setTimeout(() => setInfoValues({message: ""}), 3000);
      }
    } else {
      try {
        props.addBook(bookInfo)
        const bookId = await getExistingBook(bookInfo.book_api_id)
        if (values.rating && values.review){
          let newBookReview = {
            book_id: bookId,
            user_id: props.currentUser.id,
            rating: parseFloat(values.rating),
            content: values.review
          }
          props.addReview(newBookReview);
          setValues({rating: null, review: ""})
        } else{
          setInfoValues({message: "You need to have a rating and a review"})
          setTimeout(() => setInfoValues({message: ""}), 3000);
        }
      }
      catch(error){
        setInfoValues({message: "Unfortunately, I failed, please refresh"})
        setTimeout(() => setInfoValues({message: ""}), 3000);
      }
    }
  }

  const toOwn = async e => {
    const theDate = moment(props.singleBook.volumeInfo.publishedDate).format("MMMM DD, YYYY")
    console.log(moment(props.singleBook.volumeInfo.publishedDate).format("MMMM DD, YYYY"))
    console.log(theDate, typeof(theDate))
    addToCategory("own")
  }

  const toRead = async e =>{
    addToCategory("read")
  }

  const toFavorites = async e => {
    addToCategory("favorites")
  }

  const addToCategory = async(type) => {
    const bookInfo = {
      title: props.singleBook.volumeInfo ? props.singleBook.volumeInfo.title: "No title",
      author: props.singleBook.volumeInfo && props.singleBook.volumeInfo.authors ? props.singleBook.volumeInfo.authors.join(', '): "Author unknown",
      publisher: props.singleBook.volumeInfo ? props.singleBook.volumeInfo.publisher : "Publisher Unknown",
      publish_date: props.singleBook.volumeInfo && props.singleBook.volumeInfo.publishedDate ? moment(props.singleBook.volumeInfo.publishedDate).format("MMMM DD, YYYY") : null,
      image: props.singleBook.volumeInfo.imageLinks? props.singleBook.volumeInfo.imageLinks.smallThumbnail :"No Image",
      book_api_id: props.singleBook.id,
      category: props.singleBook.volumeInfo.categories ? props.singleBook.volumeInfo.categories.join(', '): "Category Unknown",
      description: props.singleBook.volumeInfo ? props.singleBook.volumeInfo.description : "This book has no description",
      list_price: props.singleBook.saleInfo.retailPrice ? props.singleBook.saleInfo.retailPrice.amount : null
    }

    const initiateCheck = await checkIfBookExist(bookInfo.book_api_id);
    if (initiateCheck){
     const bookId = await getExistingBook(bookInfo.book_api_id)
     const userId = props.currentUser.id
     const addingToOwn = {
       user_id: userId,
       book_id: bookId,
       borrowed: false
     }
     const regularAdd = {
       user_id: userId,
       book_id: bookId,
     }

     switch(type){
       case "own":
         const owned = await checkIfInCategory(type, userId, bookId)
         if (owned){
           setInfoValues({message: "You already own this book"})
           setTimeout(() => setInfoValues({message: ""}), 3000);
         } else {
           props.addToOwn(addingToOwn);
         }
         break
       case "favorites":
         const favorited = await checkIfInCategory(type, userId, bookId)
         if (favorited){
           setInfoValues({message: "You already favorited this book"})
           setTimeout(() => setInfoValues({message: ""}), 3000);
         } else {
           props.addToFavorite(regularAdd);
         }
         break
       case "read":
         const read = await checkIfInCategory(type, userId, bookId)
         if (read){
           setInfoValues({message: "You already read this book"})
           setTimeout(() => setInfoValues({message: ""}), 3000);
         } else {
           props.addToRead(regularAdd);
         }
         break
       default:
         return
     }
    } else {
      props.addBook(bookInfo)
      const bookId = await getExistingBook(bookInfo.book_api_id)
      const userId = props.currentUser.id
      const addingToOwn = {
        user_id: userId,
        book_id: bookId,
        borrowed: false
      }
      const regularAdd = {
        user_id: userId,
        book_id: bookId,
      }
      switch(type){
        case "own":
          const addToOwned = await props.addToOwn(addingToOwn);
          return addToOwned;
        case "favorites":
          const addToFav = props.addToFavorite(regularAdd);
          return addToFav;
        case "read":
          const addToAlreadyRead = props.addToRead(regularAdd);
          return addToAlreadyRead
        default:
          return
      }
    }
  }

  const existInOwn = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/"
    });
    try {
      const ownedCheck = await client.query({query: BOOK_OWNED_EXIST_IN_USER, variables: {userId: user_id}});
      const filteredOwned = ownedCheck.data.getBooksOwnedByUserId.some(owned => {
        return owned.book_id.id === book_id
      })
      return filteredOwned
    }
    catch (error){
      setInfoValues({message: "Error in adding this book"})
      setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  const existInRead = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/"
    });
    try {
      const readCheck = await client.query({query: BOOK_READ_EXIST_IN_USER, variables: {userId: user_id}});
      const filteredRead = readCheck.data.getBooksReadByUserId.some(owned => {
        return owned.book_id.id === book_id
      })
      return filteredRead
    }
    catch (error){
      setInfoValues({message: "Error in adding this book in read"})
      setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  const existInFavorite = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/"
    });
    try {
      const favoriteCheck = await client.query({query: FAVORITE_BOOK_EXIST_IN_USER, variables: {userId: user_id}});
      const filteredFavorite = favoriteCheck.data.getFavoriteBooksByUserId.some(owned => {
        return owned.book_id.id === book_id
      })
      return filteredFavorite
    }
    catch (error){
      setInfoValues({message: "Unable to add to favorites"})
      setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  const checkIfInCategory = async (type, user_id, book_id) => {
    switch(type){
      case "own":
        const ownExist = await existInOwn(user_id, book_id)
        return ownExist;
      case "favorites":
        const favoriteExist = await existInFavorite(user_id, book_id)
        return favoriteExist;
      case "read":
        const readExist = await existInRead(user_id, book_id)
        return readExist;
      default:
        return
    }
  }

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal className="singleBookModal" show={props.openBook} onHide={handleBookClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.singleBook.volumeInfo ? props.singleBook.volumeInfo.title: "No title"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="singleBookContainer">
            <div>
              <img className="singleBookImage" src={props.singleBook.volumeInfo && props.singleBook.volumeInfo.imageLinks ? props.singleBook.volumeInfo.imageLinks.smallThumbnail : noCover } alt={props.singleBook.volumeInfo ? props.singleBook.volumeInfo.title: "No title"}  />
            </div>
            <div className="singleBookInfo">
              {infoMessage.message && <h1> {infoMessage.message} </h1>}
              <h1><span> Title: </span> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.title: "No title"}</h1>
              <h1><span>{props.singleBook.volumeInfo && props.singleBook.volumeInfo.authors && props.singleBook.volumeInfo.authors.length === 1 ? "Author: " : "Authors: "}</span> {props.singleBook.volumeInfo && props.singleBook.volumeInfo.authors ? props.singleBook.volumeInfo.authors.join(', '): "Author unknown"}</h1>
              <h1><span> Published: </span> {props.singleBook.volumeInfo ? moment(props.singleBook.volumeInfo.publishedDate).format("MMMM DD, YYYY") : "Publish date unknown"}</h1>
              <h1><span> Publisher: </span> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.publisher : "Publisher Unknown"} </h1>
              <h1><span> ISBN: </span>{props.singleBook.volumeInfo && props.singleBook.volumeInfo.industryIdentifiers ? props.singleBook.volumeInfo.industryIdentifiers[0].identifier : "no isbn"}</h1>
              <a target="_blank" rel="noopener noreferrer" href={props.singleBook.volumeInfo ? props.singleBook.volumeInfo.infoLink : null}><Button> Buy now </Button></a>
            </div>
          </div>
          <div className="singleBookDescription">
            <h1><span> Description: </span></h1>
            <p> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.description : "This book has no description" } </p>
          </div>
          <div className="reviewForm">
            <h1> Add your review </h1>
            <div className="reactRating">
              <h2> Rating: </h2>
              <ReactStars
                className="reactStars"
                count={5}
                color2={'#FFC914'}
                size={25}
                onChange={ratingChange}
                value={values.rating}
                />
            </div>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control onChange={handleInputChange} value={values.review} name="review"
              as="textarea" rows="4" placeholder="Add your review"/>
              </Form.Group>
            </Form>
          </div>
          <Button variant="primary" onClick={addReview}>
            Add Review
          </Button>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={toOwn}>
            Add to Own
          </Button>
          <Button variant="primary" onClick={toFavorites}>
            Add to Favorites
          </Button>
          <Button variant="primary" onClick={toRead}>
            Add to Read
          </Button>
          <Button variant="secondary" onClick={handleShow}>
            Back to Results
          </Button>

        </Modal.Footer>
      </Modal>

      <Modal show={props.openSearchModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        { props.error && <Modal.Body> {props.error}</Modal.Body>}
        { !props.searchResult &&
        <Modal.Body> Unfortunately, I can't seem to find that book.</Modal.Body> }

        { props.searchResult && props.searchResult.length !== 0 ?
          <Modal.Body>
          {props.searchResult.map(result =>{
            return <SearchResult key={result.id} result={result} />
          })}
          </Modal.Body> :
          <Modal.Body> Please Search for a book</Modal.Body>
        }
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Navigation />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/news" render={() => <News />} />
      <Route exact path="/login" render={() => <LogInOrRegister />} />
      <PrivateRoute exact path="/settings" render={() => <Settings />} />
      <Route exact path="/booksDashboard" render={() => <Books />} />
      <Route exact path="/booksCategory" render={(props) => <BooksCategoryAll {...props}/> } />
      <Route exact path ="/book/:id" render={(props) => <Book {...props} />} />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    fetchingData: state.search.fetchingData,
    input: state.search.input,
    openSearchModal: state.search.openSearchModal,
    openBook: state.search.openBook,
    searchValue: state.search.searchValue,
    searchResult: state.search.searchResult,
    singleBook: state.search.singleBook,
    error: state.search.error,
    bookId: state.book.book.id,
    bookError: state.book.error,
    bookSuccess: state.book.success,
    addingCategory: state.category.addingCategory,
    ownedAdded: state.category.ownedAdded,
    favoriteAdded: state.category.favoriteAdded,
    readAdded: state.category.readAdded,
    categoryError: state.category.categoryError
  }
}

export default withRouter(connect(mapStateToProps, {openModal, closeModal, openBookModal, closeBookModal, addBook, successAdd, addReview, addToOwn, addToRead, addToFavorite})(App));
