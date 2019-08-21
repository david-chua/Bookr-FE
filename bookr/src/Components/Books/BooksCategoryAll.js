import React from 'react';
import AllBooksPerCategory from './AllBooksPerCategory';

class BooksCategoryAll extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    const books = this.props.location.state.books;
    return(
      <div>
        {this.props.location.state.type === "owned" && <h1 className="categoryTitle"> Owned Books</h1>}
        {this.props.location.state.type === "read" && <h1 className="categoryTitle"> Books I've Read</h1>}
        {this.props.location.state.type === "favorite" && <h1 className="categoryTitle"> My Favorite Books</h1>}
        <div  className="booksContainer">
        {books.map(book => {
          return (<AllBooksPerCategory book ={book} />)
        })}
        </div>
      </div>
    )
  }
}

export default BooksCategoryAll;
