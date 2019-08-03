import { combineReducers } from 'redux';
import users from './usersReducers';
import search from './searchReducers';

export default combineReducers({
  users,
  search
})
