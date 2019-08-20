import {
  ADDING_CATEGORY,
  OWNED_ADDED,
  FAVORITE_ADDED,
  READ_ADDED,
  CATEGORY_ERROR,
  DELETING_CATEGORY,
  OWNED_DELETED,
  READ_DELETED,
  FAVORITE_DELETED
} from '../actions/categoryActions';

const initialState = {
  addingCategory: false,
  deletingCategory: false,
  ownedAdded: false,
  ownedDeleted: false,
  favoriteAdded: false,
  favoriteDeleted: false,
  readAdded: false,
  readDealeted: false,
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
    case DELETING_CATEGORY:
      return{
        ...state,
        deletingCategory: true
      }
    case OWNED_ADDED:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: true,
        ownedDeleted: false,
        readAdded: false,
        readDealeted: false,
        favoriteAdded: false,
        favoriteDeleted: false,
        addingCategory: false,
        ownedBook: action.payload,
        favoriteBook: [],
        readBook: [],
        categoryError: null
      }
    case OWNED_DELETED:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: false,
        ownedDeleted: true,
        readAdded: false,
        readDeleted: false,
        favoriteAdded: false,
        favoriteDeleted: false,
        addingCategory: false,
        ownedBook: [],
        favoriteBook: [],
        readBook: [],
        categoryError: null
      }
    case READ_ADDED:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: false,
        ownedDeleted: false,
        readAdded: true,
        readDeleted: false,
        favoriteAdded: false,
        favoriteDeleted: false,
        addingCategory: false,
        ownedBook: [],
        favoriteBook: [],
        readBook: action.payload,
        categoryError: null
      }
    case READ_DELETED:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: false,
        ownedDeleted: false,
        readAdded: false,
        readDeleted: true,
        favoriteAdded: false,
        favoriteDeleted: false,
        addingCategory: false,
        ownedBook: [],
        favoriteBook: [],
        readBook: [],
        categoryError: null
      }
    case FAVORITE_ADDED:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: false,
        ownedDeleted: false,
        readAdded: false,
        readDeleted: false,
        favoriteAdded: true,
        favoriteDeleted: false,
        addingCategory: false,
        ownedBook: [],
        readBook: [],
        favoriteBook: action.payload,
        categoryError: null
      }
    case FAVORITE_DELETED:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: false,
        ownedDeleted: false,
        readAdded: false,
        readDeleted: false,
        favoriteAdded: false,
        favoriteDeleted: true,
        addingCategory: false,
        ownedBook: [],
        favoriteBook: [],
        readBook: [],
        categoryError: null
      }
    case CATEGORY_ERROR:
      return{
        ...state,
        deletingCategory: false,
        ownedAdded: false,
        ownedDeleted: false,
        readAdded: false,
        readDeleted: false,
        favoriteAdded: false,
        favoriteDeleted: false,
        addingCategory: false,
        ownedBook: [],
        favoriteBook: [],
        readBook: [],
        error: action.payload
      }
    default:
      return state;
  }
}
