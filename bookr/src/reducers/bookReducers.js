import { ADDING_BOOK, DELETING_BOOK, BOOK_ADDED, BOOK_DELETED, BOOK_ERROR, BOOK_ADDED_SUCCESSFULLY } from '../actions/bookActions';

const initialState = {
  addingBook: false,
  bookAdded: false,
  bookExistBoolean: false,
  book: [],
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
    case BOOK_ADDED:
      return{
        ...state,
        addingBook: false,
        error: false,
        bookAdded: true,
        book: action.payload,
      }
    case BOOK_ERROR:
      return{
        ...state,
        addingBook: false,
        error: action.payload
      }
    case BOOK_ADDED_SUCCESSFULLY:
      return{
        ...state,
        success: 'successfully added book'
      }
    default:
      return state;
  }
}
