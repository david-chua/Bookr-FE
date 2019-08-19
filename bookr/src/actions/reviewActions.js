import ApolloClient from "apollo-boost";
import { ADD_REVIEW_MUTATION } from "../graphQL/mutations";

export const ADDING_REVIEW = "ADDING_REVIEW";
export const EDITING_REVIEW = "EDITING_REVIEW";
export const DELETING_REVIEW = "DELETING_REVIEW";
export const REVIEW_ADDED = "REVIEW_ADDED";
export const REVIEW_EDITED = "REVIEW_EDITED";
export const REVIEW_DELETED = "REVIEW_DELETED";
export const REVIEW_ERROR = "REVIEW_ERROR"

export function addReview(review){
  return dispatch => {
    dispatch({type: ADDING_REVIEW});
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      // uri: "https://bookr-back-end.herokuapp.com/",
      uri: "http://localhost:9090/",
      headers: { authorization: token }
    });
    client
      .mutate({
        mutation: ADD_REVIEW_MUTATION,
        variables: {
          input: review
        }
      })
      .then(response => {
        console.log('success', response)
        dispatch({
          type: REVIEW_ADDED,
          payload: response.data.addReview
        })
      })
      .catch(error => {
        console.log('review error',error)
        dispatch({
          type: REVIEW_ERROR,
          payload: "Unable to add a review"
        })
      })
  }
}
