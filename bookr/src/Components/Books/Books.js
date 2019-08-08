import React from 'react';
import ApolloClient from "apollo-boost";
import { connect } from "react-redux";
import { GET_ALL_COLLECTION } from "../../graphQL/queries";

class Books extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      booksRead: [],
      booksOwned: [],
      favoriteBooks: [],
      reviewedBooks: []
    }
  }

  componentDidMount(){
    const token = localStorage.getItem("token");
    const client = new ApolloClient({
      uri: "http://localhost:9090",
      headers: { authorization: token }
    });
    client.query({
      query: GET_ALL_COLLECTION,
      variables: {
        userId: this.props.currentUser.id
      }
    })
    .then(response => {
      const data = response.data.getUserById;
      this.setState({
        booksRead: data.booksRead,
        booksOwned: data.booksOwned,
        favoriteBooks: data.favoriteBooks,
        reviewedBooks: data.reviews
      })
    })
  }

  render(){
    console.log(this.state);
    return(
      <div>
        <h1> Books </h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
  }
}

export default connect(mapStateToProps, {})(Books);
