import {FETCHING_DATA, SEARCH_BOOK, OPEN_MODAL, CLOSE_MODAL, SEARCH_ERROR}from '../actions/searchActions';

const initialState = {
  fetchingData: false,
  input: '',
  openSearchModal: false,
  searchValue: '',
  searchResult: [],
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
        searchResult: action.payload,
        error: null,
        input: '',
      }
    case SEARCH_ERROR:
      return {
        ...state,
        fetchingData: false,
        openSearchModal: true,
        searchResult: [],
        error: action.payload,
        input: ''
      }
    case OPEN_MODAL:
      return {
        ...state,
        openSearchModal: true
      }
    case CLOSE_MODAL:
      return {
        ...state,
        openSearchModal: false,
        searchResult: [],
        error: null
      }
    default:
      return state;
  }
}
