import { ADDING_REVIEW, EDITING_REVIEW, DELETING_REVIEW, REVIEW_ADDED, REVIEW_DELETED, REVIEW_EDITED, REVIEW_ERROR } from '../actions/reviewActions';

const initialState = {
  addingReview: false,
  deletingReview: false,
  editingReview: false,
  reviewAdded: false,
  reviewDeleted: false,
  reviewEdited: true,
  review: [],
  success: null,
  error: null
}

export default function review(state = initialState, action){
  switch(action.type){
    case ADDING_REVIEW:
      return {
        ...state,
        addingReview: true,
        deletingReview: false,
        editingReview: false,
        reviewAdded: false,
        reviewDeleted: false,
        reviewEdited: false,
        review: [],
        success: null,
        error: null
      }
      case DELETING_REVIEW:
        return{
          ...state,
          addingReview:false,
          deletingReview: true,
          editingReview: false,
          reviewAdded: false,
          reviewDeleted: false,
          reviewEdited: false,
          review: [],
          success: null,
          error: null
        }
    case EDITING_REVIEW:
      return{
        ...state,
        addingReview:false,
        deletingReview: false,
        editingReview: true,
        reviewAdded: false,
        reviewDeleted: false,
        reviewEdited: false,
        review: [],
        success: null,
        error: null
      }
    case REVIEW_ADDED:
      return{
        ...state,
        addingReview: false,
        deletingReview: false,
        error: false,
        reviewAdded: true,
        reviewDeleted: false,
        review: action.payload,
        success: 'Review successfully added'
      }
    case REVIEW_DELETED:
      return{
        ...state,
        addingReview:false,
        deletingReview: false,
        editingReview: false,
        reviewAdded: false,
        reviewDeleted: true,
        reviewEdited: false,
        review: [],
        success: null,
        error: null
      }
    case REVIEW_EDITED:
      return{
        ...state,
        addingReview:false,
        deletingReview: false,
        editingReview: false,
        reviewAdded: false,
        reviewDeleted: false,
        reviewEdited: true,
        review: [],
        success: null,
        error: null
      }
    case REVIEW_ERROR:
      return{
        ...state,
        addingReview: false,
        deletingReview: false,
        error: action.payload
      }
    default:
      return state;
  }
}
