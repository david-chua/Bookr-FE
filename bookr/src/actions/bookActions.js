import ApolloClient from "apollo-boost";
import { ADD_BOOK_MUTATION } from "../graphQL/mutations";

export const ADDING_BOOK = "ADDING_BOOK";
export const DELETING_BOOK = "DELETING_BOOK";
export const BOOK_ADDED = "BOOK_ADDED";
export const BOOK_DELETED = "BOOK_DELETED";
export const BOOK_ERROR = "BOOK_ERROR";


export function addBook(book){
  return dispatch => {
    dispatch({type: ADDING_BOOK});
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090",
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
