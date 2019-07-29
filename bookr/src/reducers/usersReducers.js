import { REGISTER_USER, LOGIN_GOOGLE, LOGIN_JWT, FETCHING_DATA, ERROR } from '../actions/usersActions';

const initialState = {
  currentUser: [],
  loggedIn: false,
  fetchingUser: false,
  fetchingData: false,
  addingUser: false,
  updatingUser: false,
  deletingUser: false,
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
        error: null,
        currentUser: action.payload
      }
    case LOGIN_JWT:
      return {
        ...state,
        fetchingData: false,
        currentUser: action.payload
      }
    case ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}
