import React from 'react'
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from './../public/images/logo.png';

const Navigation = props => {
    return(
      <div>
        <section>
          <div className="topNav">
            <div className="LogoContainer">
              <img src={logo} alt="bookr logo" />
            </div>
              {props.loggedIn? (
                <LinkContainer className="loginLink" to="/">
                  <Nav.Link >Logout</Nav.Link>
                </LinkContainer>
              ): (
                <LinkContainer className="loginLink" to="/login">
                  <Nav.Link >Log In</Nav.Link>
                </LinkContainer>
              )}
          </div>
          <NavBar />
        </section>
      </div>
    )
}

const mapStateToProps = function(state){
  return{
    loggedIn: state.users.loggedIn
  }
}

export default withRouter(connect(mapStateToProps)(Navigation));
