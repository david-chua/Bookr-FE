import React from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { mainLoginPage, registerUser, signInError } from '../../actions/usersActions';

class RegisterForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      gender: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  registerUser = e => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword){
      let newUser = {
        username: this.state.username,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        gender: this.state.gender,
        password: this.state.password
      }
      this.props.registerUser(newUser)
    }
    else {
      this.props.signInError();
    }
  }

  render(){
    const { from } = this.props.location || { from : { pathname: "/" } };
    if (this.props.toHome === true){
      return <Redirect to={from} />;
    }
    return(
      <div className="registerForm">
      <Form onSubmit={this.registerUser}>
        <Form.Group>
          <Form.Label className="registerValues">Username </Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="What do you want for your screen name? " />
        </Form.Group>
        <Form.Group>
          <Form.Label className="registerValues">Email </Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="What's your email?" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="registerValues">First name </Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.first_name} name="first_name" type="text" placeholder="What's your first name?" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="registerValues">Last name </Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.last_name} name="last_name" type="text" placeholder="What's your last name?" />
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
        <Form.Group>
          <Form.Label className="registerValues">Password</Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Enter password" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="registerValues">Confirm Password</Form.Label>
          <Form.Control onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm password" />
        </Form.Group>
        <Button className="signupBtn" type="submit"> Submit</Button>
      </Form>
      <Button onClick={() => this.props.mainLoginPage()} className="signupBtn" type="button">I have an account</Button>
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

export default connect(mapStateToProps, {mainLoginPage, registerUser, signInError})(RegisterForm);
