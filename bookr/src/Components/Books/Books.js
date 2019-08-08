import React from 'react';

class Books extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userCollection: []
    }
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div>
        <h1> Books </h1>
      </div>
    )
  }
}

export default Books;
