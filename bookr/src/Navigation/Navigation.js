import React from 'react'
import NavBar from './NavBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import logo from './../public/images/logo.png';
import { logOut } from '../actions/usersActions';

const Navigation = props => {

  const loggingOut = () => {
    props.logOut();
    props.history.push('/');
  }

  return(
    <div>
      <section>
        <div className="topNav">
          <div className="LogoContainer">
            <img src={logo} alt="bookr logo" />
          </div>
          {props.loggedIn? (
            <div onClick={loggingOut}>
              <Nav.Link >Logout</Nav.Link>
            </div>
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
    loggedIn: state.users.loggedIn,
    toHome: state.users.toHome
  }
}

export default withRouter(connect(mapStateToProps, { logOut })(Navigation));
