import React from 'react';
import axios from 'axios';

class Book extends React.Component {
  constructor(props){
    super(props)

    this.updateCover = this.updateCover.bind(this);
  }

 updateCover = (isbn) => {
   axios(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
   .then(response => {
           console.log('google api response', response.data)
      return <h3> Hi </h3>
    })
    .catch(error=> {
     console.log(error);
    });
  }

  render(){
    console.log(this.props)
    return(
      <div className="bookContainer">
        <div className="bookTitleContainer">
          <a className="bookLink" target="_blank" rel="noopener noreferrer" href={this.props.book.amazon_product_url}><h1> {this.props.book.book_details[0].title} </h1></a>
        </div>
          <section className="bookInfo">
            <h3 className="author"> {this.props.book.book_details[0].author} </h3>
            { this.updateCover(this.props.book.isbns[0].isbn10) }
            <h3 className="sourceName"> {this.props.book.book_details[0].publisher}</h3>
            <h3 className="desc"> {this.props.book.book_details[0].description}</h3>
          </section>
      </div>
    )

  }
}


export default Book;
