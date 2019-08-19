import ApolloClient from "apollo-boost";
import { USER_EXIST } from "../graphQL/queries";
import { ADD_USER_MUTATION, LOGIN_JWT_MUTATION, EDIT_PASSWORD_MUTATION, EDIT_USER_MUTATION } from "../graphQL/mutations";

export const FETCHING_DATA = "FETCHING_DATA";
export const REGISTER_USER = "REGISTER_USER";
export const MAIN_LOGIN_PAGE = "MAIN_LOGIN_PAGE";
export const LOGIN_JWT = "LOGIN_JWT";
export const LOGIN_GOOGLE = "LOGIN_GOOGLE"
export const LOGIN_GOOGLE_ERROR = "LOGIN_GOOGLE_ERROR";
export const LOGIN_JWT_ERROR = "LOGIN_JWT_ERROR";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";
export const REGISTER_PAGE = "REGISTER_PAGE";
export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const EDIT_PASSWORD = "EDIT_PASSWORD";
export const ERROR = "ERROR";
export const LOG_OUT = "LOG_OUT";

export function googleLogin(email, last_name, first_name, token){
  return dispatch => {
    dispatch({type: FETCHING_DATA });
    const client = new ApolloClient({
      uri: "http://localhost:9090/",
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

export function jwtLogin(email, password){
  const userInfo = {
    email: email,
    password: password
  }
  return dispatch => {
    dispatch({type: FETCHING_DATA });
    const client = new ApolloClient({
      uri: "http://localhost:9090/",
    });
    client
      .mutate({
        mutation: LOGIN_JWT_MUTATION,
        variables: {
          input: userInfo
        }
      })
      .then(response => {
        localStorage.setItem("token", response.data.loginUser.token);
        const token = localStorage.getItem("token");
        const jwtClient = new ApolloClient({
          uri: "http://localhost:9090/",
          headers: { authorization: token}
        })
        jwtClient
          .query({
            query: USER_EXIST,
            variables: {
              param: "email",
              value: response.data.loginUser.email
            }
          })
          .then(response => {
            dispatch({
              type: LOGIN_JWT,
              payload: response.data.getUserBy
            })
          })
          .catch(error =>{
            dispatch({
              type: LOGIN_JWT_ERROR,
              payload: "create an account to use Bookr"
            })
          })
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: "account not found"
      });
    })
  }
}

export function signInError(){
  return dispatch => {
    dispatch({
      type: SIGN_IN_ERROR,
      payload: "sign up for an account"
    })
  }
}

export function registerPage(){
  return dispatch => {
    dispatch({
      type: REGISTER_PAGE
    })
  }
}

export function mainLoginPage(){
  return dispatch => {
    dispatch({
      type: MAIN_LOGIN_PAGE
    })
  }
}

export function registerUser(newUser){
  return dispatch => {
    dispatch({ type: FETCHING_DATA})
    const client = new ApolloClient({
      uri: "http://localhost:9090/",
    });
    client
      .mutate({
        mutation: ADD_USER_MUTATION,
        variables: {
          input: newUser
        }
      })
      .then(response => {
        const userInfo = {
          email: newUser.email,
          password: newUser.password
        }
        client
          .mutate({
            mutation: LOGIN_JWT_MUTATION,
            variables: {
              input: userInfo
            }
          })
          .then(response => {
            localStorage.setItem("token", response.data.loginUser.token);
            const token = localStorage.getItem("token");
            const jwtClient = new ApolloClient({
              uri: "http://localhost:9090/",
              headers: { authorization: token}
            })
            jwtClient
            .query({
              query: USER_EXIST,
              variables: {
                param: "email",
                value: response.data.loginUser.email
              }
            })
            .then(response => {
              dispatch({
                type: LOGIN_JWT,
                payload: response.data.getUserBy
              })
            })
            .catch(error =>{
              dispatch({
                type: LOGIN_JWT_ERROR,
                payload: "create an account to use Bookr"
              })
            })
          })
      })
      .catch(error => {
        dispatch({
          type: ERROR,
          payload: "Unable to create an account"
      });
    })
  }
}

export function logOut(){
  return dispatch => {
    localStorage.removeItem("token");
    dispatch({
      type: LOG_OUT
    })
  }
}

export function editUser(id, userInfo) {
  return dispatch => {
    dispatch({type: FETCHING_DATA})
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090/",
      headers: { authorization: token}
    });
    client.mutate({
      mutation: EDIT_USER_MUTATION,
      variables: ({
        id: id,
        input: userInfo
      })
    })
    .then(response => {
      console.log(response)
      dispatch({
        type: EDIT_USER_INFO,
        payload: response.data.updateUser
      })
    })
    .catch(error => {
      console.log('edit error', error);
    })
  }
}

export function editPassword(id, input){
  return dispatch => {
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090/",
      headers: { authorization: token}
    });
    client.mutate({
      mutation: EDIT_PASSWORD_MUTATION,
      variables: ({
        id: id,
        input: input
      })
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }
}
