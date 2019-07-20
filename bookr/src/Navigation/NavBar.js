import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
      <Navbar collapseOnSelect expand="lg" className="justify-content-space-around">
        <Nav justify>
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/books">Books</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {props.loggedIn? (
                <Nav.Link to="/">Logout</Nav.Link>
            ): (
                <Nav.Link to="/login">Log In</Nav.Link>
            )}
          </Nav.Item>
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
