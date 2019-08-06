import { combineReducers } from 'redux';
import users from './usersReducers';
import search from './searchReducers';
import review from './reviewReducers';

export default combineReducers({
  users,
  search,
  review
})
