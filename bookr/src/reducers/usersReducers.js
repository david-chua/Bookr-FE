import { REGISTER_USER, LOGIN_USER } from '../actions/usersActions';

const initialState = {
  currentUser: [],
  loggedIn: false,
  fetchingUser: false,
  addingUser: false,
  updatingUser: false,
  deletingUser: false,
  error: null
}


export default function users(state = initialState, action){
  switch(action.type){
    default:
      return state;
  }
}
