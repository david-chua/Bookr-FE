import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from './public/images/logo.png';

class Footer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      message: ""
    }
  }

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendEmail = e => {
    e.preventDefault();

  }

  render(){
    return(
      <div className="footerContainer">
        <section className="companySection">
          <img className="footerLogo" src={logo} alt="logo"/>
          <div>
            <h4>Bookr</h4>
            <h4>Copyright © 2019 All rights reserved</h4>
          </div>
        </section>
        <section className="creatorSection">
          <h3> About the creator: </h3>
          <a target="_blank" rel="noopener noreferrer" href="https://www.davidchua.me/"><h4>David Chua</h4></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/david-chua"><h4>Github</h4></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/dpchua/"><h4>LinkedIn</h4></a>
        </section>
        <section className="emailMessage">
          <h4> Contact Bookr </h4>
          <Form action="https://formcarry.com/s/lkxrEmCtTHL" method="POST" acceptCharset="UTF-8">
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="emailLabel">Email address</Form.Label>
              <Form.Control onChange={this.onChangeHandler} value={this.state.email} name="email" type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="textLabel">Enter your message here</Form.Label>
              <Form.Control name="message" onChange={this.onChangeHandler} value={this.state.message} as="textarea" rows="4" />
            </Form.Group>
            <Button className="contactBtn" type="submit"> Submit</Button>
          </Form>
        </section>
      </div>
    )
  }
}

export default Footer;
