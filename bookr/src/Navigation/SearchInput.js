import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class Search extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      input: '',
    }
  }

  render(){
    return(
      <Form inline>
        <Form.Control type="text" placeholder="Search for a book" value={this.state.input} className="mr-sm-2" />
        <Button type="submit">Search</Button>
      </Form>
    )
  }
}

export default Search;
