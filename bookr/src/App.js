import React from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import ApolloClient from "apollo-boost";
import Navigation from './Navigation/Navigation';
import Home from './Home';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Books from './Components/Books/Books';
import LogInOrRegister from "./Components/Auth/Login";
import SearchResult from "./Components/SearchResult/SearchResult";
import Footer from './Footer';
import noCover from "./public/images/noCover.jpg";
import { GET_CURRENT_USER_QUERY } from './graphQL/queries';
import { openModal, closeModal, openBookModal, closeBookModal } from './actions/searchActions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const token = localStorage.getItem("token");
  const client = new ApolloClient({
    uri: "http://localhost:9090",
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
    console.log('handle book close');
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
              <img src={props.singleBook.volumeInfo ? props.singleBook.volumeInfo.imageLinks.smallThumbnail : noCover } />
            </div>
            <div className="singleBookInfo">
              <h1><span> Title: </span> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.title: "No title"}</h1>
              <h1><span>{props.singleBook.volumeInfo && props.singleBook.volumeInfo.authors.length === 1 ? "Author: " : "Authors: "}</span> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.authors.join(', '): "Author unknown"}</h1>
              <h1><span> Published: </span> {props.singleBook.volumeInfo ? moment(props.singleBook.volumeInfo.publishedDate).format("MMMM DD, YYYY") : "Publish date unknown"}</h1>
              <h1><span> Publisher: </span> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.publisher : "Publisher Unknown"} </h1>
              <h1><span> ISBN: </span>{props.singleBook.volumeInfo  ? props.singleBook.volumeInfo.industryIdentifiers[0].identifier : "no isbn"}</h1>
              <a target="_blank" href={props.singleBook.volumeInfo ? props.singleBook.volumeInfo.infoLink : null}><Button> Buy now </Button></a>
            </div>
          </div>
          <div className="singleBookDescription">
            <h1><span> Description: </span></h1>
            <p> {props.singleBook.volumeInfo ? props.singleBook.volumeInfo.description : "This book has no description" } </p>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleBookClose}>
            Add to Own
          </Button>
          <Button variant="primary" onClick={handleBookClose}>
            Add to Favorites
          </Button>
          <Button variant="primary" onClick={handleBookClose}>
            Add to Read
          </Button>
          <Button variant="secondary" onClick={handleBookClose}>
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
      <Route exact path="/books" render={() => <Books />} />
      <Footer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    fetchingData: state.search.fetchingData,
    input: state.search.input,
    openSearchModal: state.search.openSearchModal,
    openBook: state.search.openBook,
    searchValue: state.search.searchValue,
    searchResult: state.search.searchResult,
    singleBook: state.search.singleBook,
    error: state.search.error
  }
}

export default withRouter(connect(mapStateToProps, {openModal, closeModal, openBookModal, closeBookModal})(App));
