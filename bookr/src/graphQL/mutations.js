import { gql } from "apollo-boost";

export const ADD_USER_MUTATION = gql`
  mutation addUser($input: UserInput!){
    addUser(input: $input){
      id
      email
    }
  }
`;

export const LOGIN_JWT_MUTATION = gql`
  mutation loginUser($input: LoginInput!){
    loginUser(input: $input){
      id
      email
      token
    }
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $input: UserInput!){
    updateUser(id: $id, input: $input){
      id
      email
      username
      first_name
      last_name
      gender
      avatar
      userType
    }
  }
`;

export const EDIT_PASSWORD_MUTATION = gql`
  mutation updatePassword($id: ID!, $input: passwordInput!){
    updatePassword(id: $id, input: $input){
      id
      email
      username
      first_name
      last_name
      gender
      avatar
      userType
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation addBook($input: BookInput!){
    addBook(input: $input){
      id
      title
      book_api_id
    }
  }
`;

export const ADD_REVIEW_MUTATION = gql`
  mutation addReview($input: ReviewInput!){
    addReview(input: $input){
      id
      content
      rating
    }
  }
`;

export const DELETE_REVIEW_MUTATION = gql`
  mutation deleteReview($id: ID!){
    deleteReview(id: $id)
  }
`;

export const EDIT_REVIEW_MUTATION = gql`
  mutation editReview($id: ID!, $input: ReviewInput!){
    editReview(id: $id, input: $input){
      id
      content
      rating
    }
  }
`;

export const ADD_BOOK_TO_OWN = gql`
  mutation addBooksOwned($input: BooksOwnedInput!){
    addBooksOwned(input: $input){
      book_id{
        id
        title
      }
    }
  }
`;

export const REMOVED_BOOK_FROM_OWN = gql`
  mutation deleteBooksOwned($input: DeleteBookInput!){
    deleteBooksOwned(input: $input)
  }
`;

export const ADD_BOOK_TO_READ = gql`
  mutation addBooksRead($input: BooksReadInput!){
    addBooksRead(input: $input){
      book_id{
        id
        title
      }
    }
  }
`;

export const REMOVED_BOOK_FROM_READ = gql`
  mutation deleteBooksRead($input: BooksReadInput!){
    deleteBooksRead(input: $input)
  }
`;

export const ADD_BOOK_TO_FAVORITE = gql`
  mutation  addFavoriteBook($input: FavoriteBooksInput!){
     addFavoriteBook(input: $input){
      book_id{
        id
        title
      }
    }
  }
`;

export const REMOVED_BOOK_FROM_FAVORITE = gql`
  mutation deleteFavoriteBook($input: FavoriteBooksInput!){
    deleteFavoriteBook(input: $input)
  }
`;
