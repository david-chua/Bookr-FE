import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

  render(){
    return(
      <div className="registerForm">
      <Form onSubmit={this.onRegularLogin}>
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
          <Form.Control onChange={this.handleChange} as="select">
            <option>Select an option</option>
            <option name="male">Male</option>
            <option name="female">Female</option>
            <option name="no_response">Decline to Answer</option>
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
      </div>
    )
  }
}

export default RegisterForm;
