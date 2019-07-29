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
