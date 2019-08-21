import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import { mainLoginPage, registerUser, signInError } from '../../actions/usersActions';


class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      gender: '',
      password: '',
      confirmPassword: ''
    }
  }

  bundleUserInfo = e => {
    e.preventDefault();
    const errors = [];
    if (this.state.password !== this.state.confirmPassword){
      errors.push({
        field: "password",
        text: "passwords must match"
      })
    }
    if (errors.length === 0){
      const userInfo = {
        username: this.state.username,
        gender: this.state.gender,
        password: this.state.password
      };
      this.props.addUser(userInfo);
    } else {
      this.setState({ error: errors });
    }
  };

  handleChange= e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    return(
      <div>
        { this.props.addUser ? (
          <Form onSubmit={this.bundleUserInfo} className="registerGoogleForm">
            <h1> To complete your registration</h1>
            <Form.Group >
              <Form.Label className="registerGoogle">Enter Username </Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Enter a username" />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
              <Form.Label className="registerGoogle">Enter Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Enter password" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="registerGoogle">Confirm Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm password" />
            </Form.Group>
            <Form.Group>
              <Form.Label className="registerValues">Select Gender </Form.Label>
              <Form.Control name="gender" onChange={this.handleChange} as="select">
                <option>Select an option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">Decline to Answer</option>
              </Form.Control>
            </Form.Group>
            <Button className="signupBtn" type="submit"> Submit</Button>
            <Button onClick={() => this.props.mainLoginPage()} className="signupBtn" type="button">I have an account</Button>
          </Form>
        ):(
          <div> Loading ...</div>
        )}
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

export default connect(mapStateToProps, {mainLoginPage, registerUser, signInError})(LoginForm);
