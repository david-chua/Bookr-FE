import React from 'react';
import ApolloClient from "apollo-boost";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { GET_ALL_COLLECTION } from "../../graphQL/queries";
import BooksOwnedLimited from "./BooksOwnedLimited";
import Button from 'react-bootstrap/Button';

class Books extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      booksRead: [],
      booksOwned: [],
      favoriteBooks: [],
      reviewedBooks: [],
      error: ''
    }
  }

  componentDidMount(){
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "https://bookr-back-end.herokuapp.com/",
      headers: { authorization: token }
    });
    client.query({
      query: GET_ALL_COLLECTION,
      variables: {
        userId: this.props.currentUser.id
      }
    })
    .then(response => {
      const data = response.data.getUserById;
      this.setState({
        booksRead: data.booksRead,
        booksOwned: data.booksOwned,
        favoriteBooks: data.favoriteBooks,
        reviewedBooks: data.reviews
      })
    })
    .catch(error => {
      this.setState({
        error: "Unable to check book in system"
      })
    });
  }

  componentDidUpdate(prevState, prevProps){
    if (prevState.addingCategory !== this.props.addingCategory){
      const token = localStorage.getItem("token");
      const client = new ApolloClient({
        uri: "https://bookr-back-end.herokuapp.com/",
        headers: { authorization: token }
      });
      client.query({
        query: GET_ALL_COLLECTION,
        variables: {
          userId: this.props.currentUser.id
        }
      })
      .then(response => {
        const data = response.data.getUserById;
        this.setState({
          booksRead: data.booksRead,
          booksOwned: data.booksOwned,
          favoriteBooks: data.favoriteBooks,
          reviewedBooks: data.reviews
        })
      })
    }
    if (prevState.error !== this.state.error){
      setTimeout(() => this.setState({error: ''}), 9000);
    }
  }

  componentWillUnmount(){
    setTimeout(() => this.setState({error: ''}), 9000);
  }


  render(){
    const books = this.state;
    const booksOwnedTen = books.booksOwned.reverse().slice(0,9)
    const booksReadTen = books.booksRead.reverse().slice(0,9)
    const favoriteTen = books.favoriteBooks.reverse().slice(0,9)
    return(
      <div>
        <h1 className="bookCategory"> Books Owned </h1>
        <div className="booksOwnedLimited">
          {booksOwnedTen.length > 0 ? booksOwnedTen.map(book => {
            return <BooksOwnedLimited key={book.book_id.id} book={book}/>
          }): <div className="learnMore">
                <h1> You do not own a book</h1>
                <h1> To start adding a book, search for a book to add.</h1>
              </div>
          }
          {books.booksOwned.length > 10 ?<div className="learnMore">
          <Link to={{
            pathname: '/booksCategory',
            state:{
              books: books.booksOwned,
              type: "owned"
            }
          }}><Button className="showMore"> Show More </Button></Link>
          </div>
          : null
          }
        </div>
        <h1 className="bookCategory"> Books Read </h1>
        <div className="booksOwnedLimited">
          {booksReadTen.length > 0 ? booksReadTen.map(book => {
            return <BooksOwnedLimited key={book.book_id.id} book={book}/>
          }): <div className="learnMore">
                <h1> You have not favorited a book</h1>
                <h1> To start adding a book, search for a book to add.</h1>
              </div>
          }
          {books.booksRead.length > 10 ? <div className="learnMore">
          <Link to={{
            pathname: '/booksCategory',
            state:{
              books: books.booksRead,
              type: "read"
            }
          }}><Button className="showMore"> Show More </Button></Link>
      </div> : null }
        </div>
        <h1 className="bookCategory"> Favorite Books </h1>
        <div className="booksOwnedLimited">
          {favoriteTen.length > 0 ? favoriteTen.map(book => {
            return <BooksOwnedLimited key={book.book_id.id} book={book}/>
          }): <div className="learnMore">
                <h1> You have not favorited a book</h1>
                <h1> To start adding a book, search for a book to add.</h1>
              </div>
          }
          {books.favoriteBooks.length > 10 ? <div className="learnMore">
            <Link to={{
              pathname: '/booksCategory',
              state:{
                books: books.favoriteBooks,
                type: "favorite"
              }
            }}><Button className="showMore"> Show More </Button></Link>
          </div>
          : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    addingCategory: state.category.addingCategory
  }
}

export default connect(mapStateToProps, {})(Books);
