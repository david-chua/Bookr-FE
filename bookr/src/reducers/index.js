import { combineReducers } from 'redux';
import users from './usersReducers';
import search from './searchReducers';
import review from './reviewReducers';
import book from './bookReducers';
import category from './categoryReducers';

export default combineReducers({
  users,
  search,
  review,
  book,
  category
})
