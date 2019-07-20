import { REGISTER_USER, LOGIN_USER } from '../actions/usersActions';

const initialState = {
  user: []
}


export default function users(state = initialState, action){
  switch(action.type){
    default:
      return state;
  }
}
