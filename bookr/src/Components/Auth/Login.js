import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import logo from "../../public/images/logo.png";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { googleLogin, jwtLogin, signInError, registerPage ,registerUser} from '../../actions/usersActions';

class LogInOrRegister extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      email: "",
      first_name: "",
      last_name: "",
      password: ""
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
    this.props.registerUser(newUser);
  };

  loginUser = async(userInfo, auth) => {
    let email, last_name, first_name, token;
    if (auth === "google"){
      email = userInfo.profileObj.email;
      last_name = userInfo.profileObj.familyName;
      first_name = userInfo.profileObj.givenName;
      token = userInfo.getAuthResponse().id_token;
      this.setState({
        email: email,
        last_name: last_name,
        first_name: first_name
      })
      localStorage.setItem("token", token);
      this.props.googleLogin(email, last_name, first_name, token);
    } else if (auth === "jwt"){
      this.props.jwtLogin(userInfo.email, userInfo.password)
    } else {
      this.props.signInError()
    }
  };

  render(){
    const { from } = this.props.location || { from : { pathname: "/" } };
    if (this.props.toHome === true){
      return <Redirect to={from} />;
    }
    return(
      <div className="loginContainer">
        <div className="loginForm">
          <div className="logoContainer">
            <img src={logo} alt={logo} />
          </div>
          { this.props.checkExistence === 1 &&
          <div className="googleLogin">
            { this.props.error && <h1> {this.props.error}</h1>}
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
                <Form.Group>
                  <Form.Label className="loginEmail">Enter Email </Form.Label>
                  <Form.Control className="inputForm registeredUserInput" onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="loginPassword">Enter Password</Form.Label>
                  <Form.Control className="inputForm registeredUserInput" onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Enter password" />
                </Form.Group>
                <Button className="signupBtn" type="submit"> Submit</Button>
              </Form>
            </div>
            <Button onClick={() => this.props.registerPage()} className="signupBtn" type="button">Sign up manually</Button>
          </div>
          }
          { this.props.checkExistence === 2 &&
            <LoginForm
              addUser={this.createUser}
              handleChange={this.handleChange}
              props={this.state}
              />
          }

          { this.props.checkExistence === 3 &&
            <RegisterForm
              addUser={this.createUser}
              />
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    loggedIn: state.users.loggedIn,
    toHome: state.users.toHome,
    checkExistence: state.users.checkExistence,
    error: state.users.error
  }
}

export default connect(mapStateToProps, {googleLogin, jwtLogin, registerPage, signInError, registerUser})(LogInOrRegister);
