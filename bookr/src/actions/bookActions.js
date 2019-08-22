import ApolloClient from "apollo-boost";
import { ADD_BOOK_MUTATION } from "../graphQL/mutations";

export const ADDING_BOOK = "ADDING_BOOK";
export const DELETING_BOOK = "DELETING_BOOK";
export const BOOK_ADDED = "BOOK_ADDED";
export const BOOK_DELETED = "BOOK_DELETED";
export const BOOK_ERROR = "BOOK_ERROR";
export const BOOK_ADDED_SUCCESSFULLY = "BOOK_ADDED_SUCCESSFULLY";


export function addBook(book){
  return dispatch => {
    dispatch({type: ADDING_BOOK});
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      // uri: "https://bookr-back-end.herokuapp.com/",
      uri: "https://bookr-back-end.herokuapp.com/",
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
        dispatch({
          type: BOOK_ADDED,
          payload: response.data.addBook
        })
      })
      .catch(error => {
        dispatch({
          type: BOOK_ERROR,
          payload: "Unable to add book"
        })
      })
  }
}

export function successAdd(){
  return dispatch => {
    dispatch({
      type: BOOK_ADDED_SUCCESSFULLY
    })
  }
}
