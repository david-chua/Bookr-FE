import ApolloClient from "apollo-boost";
import { ADD_BOOK_TO_OWN, ADD_BOOK_TO_READ, ADD_BOOK_TO_FAVORITE } from "../graphQL/mutations";

export const ADDING_CATEGORY = "ADDING_CATEGORY";
export const OWNED_ADDED = "OWNED_ADDED";
export const FAVORITE_ADDED = "FAVORITE_ADDED";
export const READ_ADDED  = "READ_ADDED";
export const CATEGORY_ERROR = "CATEGORY_ERROR";

export function addToOwn(input){
  return dispatch => {
    dispatch({type: ADDING_CATEGORY});
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090",
      headers: { authorization: token }
    });
    client
      .mutate({
        mutation: ADD_BOOK_TO_OWN,
        variables: {
          input: input
        }
      })
      .then(response => {
        console.log('success in adding to own', response)
        dispatch({
          type: OWNED_ADDED,
          payload: response.data.addBooksOwned
        })
      })
      .catch(error => {
        console.log('review error',error)
        dispatch({
          type: CATEGORY_ERROR,
          payload: "Unable to add to owned book"
        })
      })
  }
}


export function addToRead(input){
  return dispatch => {
    dispatch({type: ADDING_CATEGORY});
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090",
      headers: { authorization: token }
    });
    client
      .mutate({
        mutation: ADD_BOOK_TO_READ,
        variables: {
          input: input
        }
      })
      .then(response => {
        dispatch({
          type: READ_ADDED,
          payload: response.data.addBooksRead
        })
      })
      .catch(error => {
        dispatch({
          type: CATEGORY_ERROR,
          payload: "Unable to add to owned book"
        })
      })
  }
}

export function addToFavorite(input){
  return dispatch => {
    dispatch({type: ADDING_CATEGORY});
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090",
      headers: { authorization: token }
    });
    client
      .mutate({
        mutation: ADD_BOOK_TO_FAVORITE,
        variables: {
          input: input
        }
      })
      .then(response => {
        console.log('success in adding to favorite', response)
        dispatch({
          type: FAVORITE_ADDED,
          payload: response.data.addFavoriteBook
        })
      })
      .catch(error => {
        console.log('review error',error)
        dispatch({
          type: CATEGORY_ERROR,
          payload: "Unable to add to favorite book"
        })
      })
  }
}
