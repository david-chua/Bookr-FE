import React from 'react';

class BooksCategoryAll extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    console.log(this.props.location.bookProps)
    return(
      <div>
        <h1> All Books </h1>
      </div>
    )
  }
}

export default BooksCategoryAll;
