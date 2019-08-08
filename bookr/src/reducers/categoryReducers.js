import {
  ADDING_CATEGORY,
  OWNED_ADDED,
  FAVORITE_ADDED,
  READ_ADDED,
  CATEGORY_ERROR
} from '../actions/categoryActions';

const initialState = {
  addingCategory: false,
  ownedAdded: false,
  favoriteAdded: false,
  readAdded: false,
  ownedBook: [],
  readBook: [],
  favoriteBook: [],
  categoryError: null
}


export default function book(state = initialState, action){
  switch(action.type){
    case ADDING_CATEGORY:
      return{
        ...state,
        addingCategory: true
      }
    case OWNED_ADDED:
      return{
        ...state,
        ownedAdded: true,
        readAdded: false,
        favoriteAdded: false,
        addingCategory: false,
        ownedBook: action.payload
      }
    case READ_ADDED:
      return{
        ...state,
        ownedAdded: false,
        readAdded: true,
        favoriteAdded: false,
        addingCategory: false,
        ownedBook: [],
        favoriteBook: [],
        readBook: action.payload
      }
    case FAVORITE_ADDED:
      return{
        ...state,
        ownedAdded: false,
        readAdded: false,
        favoriteAdded: true,
        addingCategory: false,
        ownedBook: [],
        readBook: [],
        favoriteBook: action.payload
      }
    case CATEGORY_ERROR:
      return{
        ...state,
        addingBook: false,
        error: action.payload
      }
    default:
      return state;
  }
}
