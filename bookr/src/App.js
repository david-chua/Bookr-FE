import React from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ApolloClient from "apollo-boost";
import Navigation from './Navigation/Navigation';
import Home from './Home';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Books from './Components/Books/Books';
import LogInOrRegister from "./Components/Auth/Login";
import Footer from './Footer';
import { GET_CURRENT_USER_QUERY } from './graphQL/queries';
import { openModal, closeModal } from './actions/searchActions';

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

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={props.openSearchModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        { props.error && <Modal.Body> {props.error}</Modal.Body>}
        { !props.searchResult &&
        <Modal.Body> Unfortunately, I can't seem to find that book.</Modal.Body> }

        { props.searchResult && props.searchResult.length !== 0 ?
          <Modal.Body>You have results!!</Modal.Body> :
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
    searchValue: state.search.searchValue,
    searchResult: state.search.searchResult,
    error: state.search.error
  }
}

export default withRouter(connect(mapStateToProps, {openModal, closeModal})(App));
