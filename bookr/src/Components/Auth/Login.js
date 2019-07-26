import React from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import ApolloClient from "apollo-boost";
import logo from "../../public/images/logo.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import LoginForm from "./LoginForm";
import { USER_EXIST } from "../../graphQL/queries";
import { ADD_USER_MUTATION } from "../../graphQL/mutations";

class LogInOrRegister extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      email: "",
      password: "",
      toHome: false,
      checkExistence: 1,

    }
  }

  onSuccess = googleUser => {
    this.loginUser(googleUser, "google");
  };

  onFailure = async error => {
    console.log(error);
  }

  onRegularLogin = e => {
    e.preventDefault()
    let registeredUser = {
      email: this.state.email,
      password: this.state.password
    }
    this.loginUser(registeredUser, "jwt");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createUser = userObj => {
    const newUser = {
      ...userObj,
      userType: "basic",
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name
    };
    const client = new ApolloClient({
      uri: "http://localhost:9090"
    });

    client
      .mutate({
        mutation: ADD_USER_MUTATION,
        variables: {
          input: newUser
        }
      })
      .then(response => {
        console.log(response);
        this.setState({ toHome: !this.state.toHome })
      })
      .catch(err =>
        console.log("There was a problem creating the user account. ", err)
      );
  };

  loginUser = async(userInfo, auth) => {
    let email, last_name, first_name, idToken, password;

    if (auth === "google"){
      email = userInfo.profileObj.email;
      last_name = userInfo.profileObj.familyName;
      first_name = userInfo.profileObj.givenName;
      idToken = userInfo.getAuthResponse().id_token;

      localStorage.setItem("token", idToken);
      const client = new ApolloClient({
        uri: "http://localhost:9090",
        headers: { authorization: idToken }
      });

      client
        .query({
          query: USER_EXIST,
          variables: {
            param: "email",
            value: email
          }
        })
        .then(response => {
          console.log('response', response)
          if (response.data.getUserBy){
            this.setState({ toHome: true });
          } else {
            this.setState({
              checkExistence: 2,
              email: email,
              last_name: last_name,
              first_name: first_name
            })
          }
        })
        .catch(err =>  console.log(err));
    } else if (auth === "jwt"){
      email = userInfo.email;
      password = userInfo.password;
      console.log('userInfo', userInfo);
      console.log('password', password)
    } else {
      console.log('login using one of the options');
    }
  };



  render(){
    const { from } = this.props.location || { from : { pathname: "/" } };
    if (this.state.toHome === true){
      return <Redirect to={from} />;
    }
    return(
      <div className="loginContainer">
        <div className="loginForm">
          <div className="logoContainer">
            <img src={logo} alt={logo} />
          </div>
          { this.state.checkExistence === 1 &&
          <div className="googleLogin">
            <h1> Login to your account!</h1>
            <div className="googleAuth">
              <GoogleLogin
                style={{height: 10 }}
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}
                theme="dark"
                />
            </div>
            <div className="manualLogin">
              <Form onSubmit={this.onRegularLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="loginEmail">Enter Email </Form.Label>
                  <Form.Control onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="loginPassword">Enter Password</Form.Label>
                  <Form.Control onChange={this.handleChange} value={this.state.password} name="password" type="text" placeholder="Enter password" />
                </Form.Group>
                <Button className="signupBtn" type="submit"> Submit</Button>
              </Form>
            </div>
            <Button className="signupBtn" type="button">Sign up manually</Button>
          </div>
          }
          { this.state.checkExistence === 2 &&
            <LoginForm
              addUser={this.createUser}
              handleChange={this.handleChange}
              props={this.state}
              />
          }


        </div>
      </div>
    )
  }
}

export default LogInOrRegister;
