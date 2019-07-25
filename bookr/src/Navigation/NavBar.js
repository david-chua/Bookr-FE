import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import ApolloClient from 'apollo-boost';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Search from './SearchInput';

import { GET_USERS } from "../graphQL/queries";

class NavBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    const idToken = "hello"
    const client = new ApolloClient({
      uri: "http://localhost:9090",
      headers: {authorization: idToken }
    })

    client.query({
      query: GET_USERS
    })
    .then(response => {
      console.log(response)
      this.setState({users: response.data.getUsers})
      console.log(this.state)
    })
  }

  render(){
    const props = this.props;
    return(
      <Navbar collapseOnSelect expand="lg">
        <Nav className="navContainer">
          <LinkContainer exact to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer exact to="/news">
            <Nav.Link>News</Nav.Link>
          </LinkContainer>
          <LinkContainer exact to="/books">
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
}

export default withRouter(NavBar);
