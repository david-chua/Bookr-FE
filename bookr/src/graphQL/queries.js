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
    }
  }
`;
