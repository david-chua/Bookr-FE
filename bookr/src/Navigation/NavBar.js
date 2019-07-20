import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Search from './SearchInput';

class NavBar extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const props = this.props;
    return(
      <Navbar collapseOnSelect expand="lg">
        <Nav className="navContainer">
          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer exact to="/settings">
            <Nav.Link>Settings</Nav.Link>
          </LinkContainer>
          <LinkContainer exact to="/books">
            <Nav.Link>Books</Nav.Link>
          </LinkContainer>
          {props.loggedIn? (
            <LinkContainer to="/">
              <Nav.Link >Logout</Nav.Link>
            </LinkContainer>
          ): (
            <LinkContainer to="/login">
              <Nav.Link >Log In</Nav.Link>
            </LinkContainer>
          )}
          <Search/>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = function(state){
  return{
    loggedIn: state.users.loggedIn
  }
}


export default withRouter(connect(mapStateToProps)(NavBar));
