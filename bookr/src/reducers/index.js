import { combineReducers } from 'redux';
import users from './usersReducers';
import search from './searchReducers';
import review from './reviewReducers';
import book from './bookReducers';

export default combineReducers({
  users,
  search,
  review,
  book
})
