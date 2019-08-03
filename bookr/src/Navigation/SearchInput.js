import React from 'react';
import { connect } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { openModal, closeModal, searchBook } from '../actions/searchActions';


class Search extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input: '',
    }
  }

  searchInputChange = e => {
    this.setState({
      input: e.target.value
    })
  }
  searchBook = () => {
    this.props.searchBook(this.state.input);
    console.log(this.props.searchResult)
  }

  render(){
    console.log(this.props.searchResult)
    return(
      <Form inline>
        <Form.Control type="text" onChange={this.searchInputChange} placeholder="Search for a book" value={this.state.input} className="mr-sm-2" />
        <Button onClick={this.searchBook} type="button">Search</Button>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingData: state.search.fetchingData,
    input: state.search.input,
    openSearchModal: state.search.openSearchModal,
    searchValue: state.search.searchValue,
    searchResult: state.search.searchResult,
    error: state.search.error
  }
}

export default connect(mapStateToProps, {openModal, closeModal, searchBook})(Search);
