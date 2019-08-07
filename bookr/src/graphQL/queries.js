import { gql } from "apollo-boost";

export const GET_USERS = gql`
  query {
    getUsers {
      id
      last_name
      first_name
      email
    }
  }
`;

export const USER_EXIST = gql`
  query getUserBy($param: String!, $value: String!){
    getUserBy(param: $param, value: $value){
      id
      email
      first_name
      last_name
      gender
      avatar
      userType
      username
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  {
    getCurrentUser {
      id
      first_name
      last_name
      email
      userType
    }
  }
`;

export const BOOK_EXIST_CHECK = gql`
  query {
    getBooks{
    id
    book_api_id
    }
  }
`;

export const REVIEW_EXIST_BY_USER_ID = gql`
  query getReviewsByUserId($userId: ID! ){
    getReviewsByUserId(userId: $userId ){
      id
      content
      book_id{
        id
        title
      }
    }
  }
`;
