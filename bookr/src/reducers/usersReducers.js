import { REGISTER_USER, LOGIN_GOOGLE, LOGIN_JWT, FETCHING_DATA, LOGIN_GOOGLE_ERROR, ERROR } from '../actions/usersActions';

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
