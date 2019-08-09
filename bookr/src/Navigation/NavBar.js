import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Search from './SearchInput';

const NavBar = props => {
  return(
    <Navbar collapseOnSelect expand="lg">
      <Nav className="navContainer">
        <LinkContainer exact to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/news">
          <Nav.Link>News</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/booksDashboard">
          <Nav.Link>Books</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/settings">
          <Nav.Link>Settings</Nav.Link>
        </LinkContainer>
        <Search/>
      </Nav>
    </Navbar>
  )
}

export default withRouter(NavBar);
