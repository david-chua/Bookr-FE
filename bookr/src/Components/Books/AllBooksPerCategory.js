import React from 'react';

class AllBooksPerCategory extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    const book = this.props.book.book_id;
    return(
      <div>
        <h1> {book.title} </h1>
      </div>
    )
  }
}

export default AllBooksPerCategory;
