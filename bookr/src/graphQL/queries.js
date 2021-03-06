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

export const GET_REVIEWS_BY_BOOK_ID = gql`
  query getReviewsBy($param: String!, $value: ID!){
    getReviewsBy(param: $param, value: $value){
      id
      rating
      content
      user_id{
        id
        username
      }
    }
  }
`;

export const BOOK_OWNED_EXIST_IN_USER = gql`
  query getBooksOwnedByUserId($userId: ID!){
    getBooksOwnedByUserId(userId: $userId){
      book_id{
        id
        book_api_id
        title
      }
    }
  }
`;

export const BOOK_READ_EXIST_IN_USER = gql`
  query getBooksReadByUserId($userId: ID!){
     getBooksReadByUserId(userId: $userId){
      book_id{
        id
        book_api_id
        title
      }
    }
  }
`;

export const FAVORITE_BOOK_EXIST_IN_USER = gql`
  query getFavoriteBooksByUserId($userId: ID!){
     getFavoriteBooksByUserId(userId: $userId){
      book_id{
        id
        book_api_id
        title
      }
    }
  }
`;

export const GET_ALL_COLLECTION = gql`
  query getUserById($userId: ID!){
    getUserById(userId: $userId){
      id
      booksRead{
        book_id{
          id
          title
          author
          description
          image
          category
          list_price
          book_api_id
          publisher
          publish_date

        }
      }
      favoriteBooks{
        book_id{
          id
          title
          author
          description
          image
          category
          list_price
          book_api_id
          publisher
          publish_date
        }
      }
      booksOwned{
        book_id{
          id
          title
          author
          description
          image
          category
          list_price
          book_api_id
          publisher
          publish_date
        }
      }
    	reviews{
        id
        book_id{
          id
          title
          author
          description
          image
          category
          list_price
          book_api_id
          publisher
          publish_date
        }
      }
    }
  }
`;
