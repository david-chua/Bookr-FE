import { ADDING_BOOK, DELETING_BOOK, BOOK_ADDED, BOOK_DELETED, BOOK_ERROR } from '../actions/bookActions';

const initialState = {
  addingBook: false,
  bookAdded: false,
  success: null,
  error: null
}

export default function book(state = initialState, action){
  switch(action.type){
    case ADDING_BOOK:
      return {
        ...state,
        addingBook: true,
        bookAdded: false,
      }
    case REVIEW_ADDED:
      return{
        ...state,
        addingBook: false,
        error: false,
        bookAdded: true,
        success: action.payload
      }
    case REVIEW_ERROR:
      return{
        ...state,
        addingBook: false,
        error: action.payload
      }
    default:
      return state;
  }
}
