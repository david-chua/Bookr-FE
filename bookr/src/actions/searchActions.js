import ApolloClient from "apollo-boost";

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
