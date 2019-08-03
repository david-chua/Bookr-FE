import ApolloClient from "apollo-boost";
import axios from 'axios';
export const FETCHING_DATA = "FETCHING_DATA";
export const SEARCH_BOOK = "SEARCH_BOOK";
export const SEARCH_ERROR = "SEARCH_ERROR";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function openModal(){
  return dispatch => {
    dispatch({
      type: OPEN_MODAL
    })
  }
}

export function closeModal(){
  return dispatch => {
    dispatch({
      type: CLOSE_MODAL
    })
  }
}

export function searchBook(input){
  return dispatch => {
    dispatch({
      type: FETCHING_DATA
    })
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${input}`)
      .then(response => {
        dispatch({
          type: SEARCH_BOOK,
          payload: response.data.items
        })
      })
      .catch(error => {
        dispatch({
          type: SEARCH_ERROR,
          payload: "umm...awkwarddddd"
        })
      })
  }
};
