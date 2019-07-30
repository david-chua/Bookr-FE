import { REGISTER_USER, MAIN_LOGIN_PAGE, REGISTER_PAGE, LOGIN_GOOGLE, LOGIN_JWT, FETCHING_DATA, LOGIN_GOOGLE_ERROR, LOGIN_JWT_ERROR, SIGN_IN_ERROR, ERROR } from '../actions/usersActions';

const initialState = {
  currentUser: [],
  loggedIn: false,
  toHome: false,
  fetchingUser: false,
  fetchingData: false,
  addingUser: false,
  updatingUser: false,
  deletingUser: false,
  checkExistence: 1,
  error: null
}


export default function users(state = initialState, action){
  switch(action.type){
    case FETCHING_DATA:
      return {
        ...state,
        fetchingData: true
      }
    case REGISTER_PAGE:
      return {
        ...state,
        checkExistence: 3
      }
    case MAIN_LOGIN_PAGE:
      return {
        ...state,
        checkExistence: 1
      }
    case REGISTER_USER:
      return {
        ...state,
        fetchingData: false,
      }
    case LOGIN_GOOGLE:
      return {
        ...state,
        fetchingData: false,
        loggedIn: true,
        toHome: true,
        error: null,
        currentUser: action.payload
      }
    case LOGIN_JWT:
      return {
        ...state,
        fetchingData: false,
        loggedIn: true,
        toHome: true,
        currentUser: action.payload,
        error: null
      }
    case LOGIN_GOOGLE_ERROR:
      return {
        ...state,
        toHome: false,
        loggedIn: false,
        fetchingData: false,
        currentUser: null,
        checkExistence: 2,
        error: action.payload
      }
    case LOGIN_JWT_ERROR:
      return {
        ...state,
        toHome: false,
        loggedIn: false,
        fetchingData: false,
        currentUser: null,
        checkExistence: 3,
        error: action.payload
      }
    case SIGN_IN_ERROR:
      return {
        ...state,
        toHome: false,
        loggedIn: false,
        fetchingData: false,
        currentUser: null,
        checkExistence: 1,
        error: action.payload
      }
    case ERROR:
      return {
        ...state,
        toHome: false,
        loggedIn: false,
        fetchingData: false,
        currentUser: null,
        checkExistence: 1,
        error: action.payload
      }
    default:
      return state;
  }
}
