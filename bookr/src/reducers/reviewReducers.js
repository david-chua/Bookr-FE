import { ADDING_REVIEW, EDITING_REVIEW, DELETING_REVIEW, REVIEW_ADDED, REVIEW_DELETED, REVIEW_EDITED, REVIEW_ERROR } from '../actions/reviewActions';

const initialState = {
  addingReview: false,
  reviewAdded: false,
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
        reviewAdded: false,
      }
    case REVIEW_ADDED:
      return{
        ...state,
        addingReview: false,
        error: false,
        reviewAdded: true,
        review: action.payload,
        success: 'Review successfully added'
      }
    case REVIEW_ERROR:
      return{
        ...state,
        addingReview: false,
        error: action.payload
      }
    default:
      return state;
  }
}
