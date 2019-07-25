import React from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import ApolloClient from "apollo-boost";
import logo from "../../public/images/logo.png";


import LoginForm from "./LoginForm";
import { USER_EXIST_QUERY } from "../../graphQL/queries";

class LogInOrRegister extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1> Login</h1>
      </div>
    )
  }
}

export default LogInOrRegister;
