import axios from 'axios';
import ApolloClient from "apollo-boost";
import { USER_EXIST } from "../graphQL/queries";
import { ADD_USER_MUTATION, LOGIN_JWT_MUTATION } from "../graphQL/mutations";

export const FETCHING_DATA = "FETCHING_DATA";
export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_JWT = "LOGIN_JWT";
export const LOGIN_GOOGLE = "LOGIN_GOOGLE"
export const LOGIN_GOOGLE_ERROR = "LOGIN_GOOGLE_ERROR";
export const ERROR = "ERROR";


export function googleLogin(email, last_name, first_name, token){
  return dispatch => {
    dispatch({type: FETCHING_DATA });
    const client = new ApolloClient({
      uri: "http://localhost:9090",
      headers: { authorization: token }
    });
    client
      .query({
        query: USER_EXIST,
        variables: {
          param: "email",
          value: email
        }
      })
      .then(response => {
        if (response.data.getUserBy){
          dispatch({
            type: LOGIN_GOOGLE,
            payload: response.data.getUserBy
          })
        } else {
          dispatch({
            type: LOGIN_GOOGLE_ERROR,
            payload: "No User exist, complete form to create an account"
          });
        }
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: "No User exist, complete form to create an account"
      });
    })
  }

}

export function loginUser(){

}
