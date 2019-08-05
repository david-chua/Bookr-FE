import {FETCHING_DATA, SEARCH_BOOK, OPEN_MODAL, CLOSE_MODAL, SEARCH_ERROR, SET_BOOK, OPEN_BOOK_MODAL, CLOSE_BOOK_MODAL}from '../actions/searchActions';

const initialState = {
  fetchingData: false,
  input: '',
  openSearchModal: false,
  openBook: false,
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
        openBook: false,
        searchResult: action.payload,
        singleBook: '',
        error: null,
        input: '',
      }
    case SEARCH_ERROR:
      return {
        ...state,
        fetchingData: false,
        openSearchModal: true,
        openBook: false,
        searchResult: [],
        singleBook: [],
        error: action.payload,
        input: ''
      }
    case OPEN_MODAL:
      return {
        ...state,
        openSearchModal: true,
        openBook: false,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        openSearchModal: false,
        searchResult: [],
        singleBook: [],
        error: null
      }
    case SET_BOOK:
      return {
        ...state,
        singleBook: action.payload
      }
    case OPEN_BOOK_MODAL:
      return {
        ...state,
        openSearchModal: false,
        openBook: true,
        error: null
      }
    case CLOSE_BOOK_MODAL:
      return {
        ...state,
        openSearchModal: false,
        openBook: false,
        searchResult: [],
        singleBook: [],
        error: null
      }
    default:
      return state;
  }
}
