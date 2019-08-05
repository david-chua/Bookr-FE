import {FETCHING_DATA, SEARCH_BOOK, OPEN_MODAL, CLOSE_MODAL, SEARCH_ERROR, OPEN_SINGLE_BOOK_MODAL, CLOSE_SINGLE_BOOK_MODAL}from '../actions/searchActions';

const initialState = {
  fetchingData: false,
  input: '',
  openSearchModal: false,
  openSingleBookModal: false,
  searchValue: '',
  searchResult: [],
  singleBook: [],
  error: null
}

export default function search(state = initialState, action){
  switch(action.type){
    case FETCHING_DATA:
      return {
        ...state,
        fetchingData: true
      }
    case SEARCH_BOOK:
      return {
        ...state,
        fetchingData: false,
        openSearchModal: true,
        openSingleBookModal: false,
        searchResult: action.payload,
        error: null,
        input: '',
      }
    case SEARCH_ERROR:
      return {
        ...state,
        fetchingData: false,
        openSearchModal: true,
        openSingleBookModal: false,
        searchResult: [],
        error: action.payload,
        input: ''
      }
    case OPEN_MODAL:
      return {
        ...state,
        openSearchModal: true,
        openSingleBookModal: false,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        openSearchModal: false,
        searchResult: [],
        error: null
      }
    case OPEN_SINGLE_BOOK_MODAL:
      return {
        ...state,
        openSearchModal: false,
        openSingleBookModal: true,
        searchResult: [],
        singleBook: action.payload,
        error: null
      }
    case CLOSE_SINGLE_BOOK_MODAL:
      return {
        ...state,
        openSearchModal: false,
        openSingleBookModal: false,
        searchResult: [],
        singleBook: [],
        error: null
      }
    default:
      return state;
  }
}
