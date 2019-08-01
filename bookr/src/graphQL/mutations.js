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
