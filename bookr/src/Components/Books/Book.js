import React from 'react';
import ApolloClient from "apollo-boost";
import { connect } from "react-redux";
import ReactStars from 'react-stars';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  GET_CURRENT_USER_QUERY,
  BOOK_EXIST_CHECK,
  REVIEW_EXIST_BY_USER_ID,
  BOOK_OWNED_EXIST_IN_USER,
  BOOK_READ_EXIST_IN_USER,
  FAVORITE_BOOK_EXIST_IN_USER,
  GET_REVIEWS_BY_BOOK_ID} from '../../graphQL/queries';
import { addToOwn, addToRead, addToFavorite, removeFromOwn, removeFromRead, removeFromFavorite } from '../../actions/categoryActions';
import { addReview, deleteReview, editReview } from '../../actions/reviewActions';
import editIcon from '../../public/images/editIcon2.png';
import deleteIcon from '../../public/images/deleteIcon.png';

class Book extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      openModal: false,
      rating: null,
      review: '',
      read: false,
      owned: false,
      favorited: false,
      reviewed: false,
      editedReview: [],
      reviews: []
    }
  }

  async componentDidMount(){
    console.log('this.props.addingCategory', this.props.addingCategory)
    const bookId = this.props.history.location.state.book.id;
    const userId = this.props.currentUser.id
    const owned = await this.existInOwn(userId, bookId)
    const read = await this.existInRead(userId, bookId)
    const favorited = await this.existInFavorite(userId, bookId)
    const reviewed = await this.checkIfUserReviewed(userId, bookId)
    const reviews = await this.getReviews()
    this.setState({
      owned: owned,
      read: read,
      favorited: favorited,
      reviewed: reviewed,
      reviews: reviews
    })
  }

  openModal = (review) => {
    this.setState({
      openModal: true,
      editedReview: review,
      review: review.content,
      rating: review.rating
    })
    console.log(review, 'review')
  }

  closeModal = () =>{
    this.setState({
      openModal: false
    })
  }

  async componentDidUpdate(prevState, prevProps){
    if (prevState.addingCategory !== this.props.addingCategory || prevState.deletingCategory !== this.props.deletingCategory){
      console.log('trueee')
      const bookId = this.props.history.location.state.book.id;
      const userId = this.props.currentUser.id
      const owned = await this.existInOwn(userId, bookId)
      console.log('owned', owned)
      const read = await this.existInRead(userId, bookId)
      console.log('read', read)
      const favorited = await this.existInFavorite(userId, bookId)
      console.log('favorited', favorited)
      this.setState({
        owned: owned,
        read: read,
        favorited: favorited,
      })
    }

    if (prevState.addingReview !== this.props.addingReview || prevState.deletingReview !== this.props.deletingReview || prevState.editingReview !== this.props.editingReview){
      const bookId = this.props.history.location.state.book.id;
      const userId = this.props.currentUser.id
      const reviewed = await this.checkIfUserReviewed(userId, bookId)
      const reviews = await this.getReviews()
      this.setState({
        reviewed: reviewed,
        reviews: reviews
      })
    }
  }

  addReview = async () => {
    if (this.state.review && this.state.rating){
      const bookId = this.props.history.location.state.book.id;
      const userId = this.props.currentUser.id
      let newReview = {
        book_id: bookId,
        user_id: userId,
        rating: parseFloat(this.state.rating),
        content: this.state.review
      }
      this.props.addReview(newReview);
      this.setState({
        review: '',
        rating: 0
      })
    } else {
      console.log('make sure review has both content and rating')
    }
  }

  editReview= () => {
    const id = this.state.editedReview.id
    const bookId = this.props.location.state.book.id;
    const userId = this.props.currentUser.id
    const input = {
      content: this.state.review,
      rating: this.state.rating,
      user_id: userId,
      book_id: bookId
    }
    this.props.editReview(id, input)

  }


  deleteReview = async(id) => {
    console.log(id)
    console.log('deleting')
    this.props.deleteReview(id)
    this.setState({
      review: '',
      rating: 0
    })
  }

  addBook = async(type) =>{
    const bookId = this.props.location.state.book.id;
    const userId = this.props.currentUser.id
    const addToOwnInput = {
      user_id: userId,
      book_id: bookId,
      borrowed: false,
    }
    const input = {
      user_id: userId,
      book_id: bookId
    }
    switch(type){
      case "own":
        console.log("adding to own")
        this.props.addToOwn(addToOwnInput)
        break
      case "favorites":
        console.log("adding to favorite")
        this.props.addToFavorite(input)
        break
      case "read":
        console.log("adding to read")
        this.props.addToRead(input)
        break
      default:
        return
    }
  }

  removeBook = async(type) =>{
    const bookId = this.props.location.state.book.id;
    const userId = this.props.currentUser.id
    const input = {
      user_id: userId,
      book_id: bookId
    }
    switch(type){
      case "own":
        console.log("removing from own")
        this.props.removeFromOwn(input)
        break
      case "favorites":
        console.log("removing from favorite")
        this.props.removeFromFavorite(input)
        break
      case "read":
        console.log("removing from read")
        this.props.removeFromRead(input)
        break
      default:
        return
    }
  }

  getReviews = async () =>{
    const bookId = this.props.history.location.state.book.id;
    const client = new ApolloClient({
      uri: "http://localhost:9090/"
    });
    const reviews = await client.query({
      query:GET_REVIEWS_BY_BOOK_ID,
      variables: { param: "book_id", value: bookId }
      })
    return reviews.data.getReviewsBy
  }

  existInOwn = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "http://localhost:9090/"
    });
    try {
      const ownedCheck = await client.query({query: BOOK_OWNED_EXIST_IN_USER, variables: {userId: user_id}});
      const filteredOwned = ownedCheck.data.getBooksOwnedByUserId.some(owned => {
        return owned.book_id.id === book_id
      })
      return filteredOwned
    }
    catch (error){
      // setInfoValues({message: "Error in adding this book"})
      // setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  existInRead = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "http://localhost:9090/"
    });
    try {
      const readCheck = await client.query({query: BOOK_READ_EXIST_IN_USER, variables: {userId: user_id}});
      const filteredRead = readCheck.data.getBooksReadByUserId.some(owned => {
        return owned.book_id.id === book_id
      })
      return filteredRead
    }
    catch (error){
      // setInfoValues({message: "Error in adding this book in read"})
      // setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  existInFavorite = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "http://localhost:9090/"
    });
    try {
      const favoriteCheck = await client.query({query: FAVORITE_BOOK_EXIST_IN_USER, variables: {userId: user_id}});
      const filteredFavorite = favoriteCheck.data.getFavoriteBooksByUserId.some(owned => {
        return owned.book_id.id === book_id
      })
      return filteredFavorite
    }
    catch (error){
      // setInfoValues({message: "Unable to add to favorites"})
      // setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  checkIfUserReviewed = async (user_id, book_id) => {
    const client = new ApolloClient({
      uri: "http://localhost:9090/"
    });
    try {
      const reviewCheck = await client.query({query: REVIEW_EXIST_BY_USER_ID, variables: {userId: user_id}});
      const filteredReview = reviewCheck.data.getReviewsByUserId.some(review => {
        return review.book_id.id === book_id
      })
      return filteredReview
    }
    catch (error){
      // setInfoValues({message: "Unfortunately, I failed, please refresh"})
      // setTimeout(() => setInfoValues({message: ""}), 3000);
    }
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  ratingChange = newRating => {
    this.setState({
      rating: newRating
    })
  }

  render(){
    const book = this.props.location.state.book
    const bookDescription = book.description ? book.description : "This book has no description"
    return(
      <div className="individualBook">
        <Modal show={this.state.openModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Search Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="reviewForm">
              <div className="reactRating">
                <h2> Rating: </h2>
                <ReactStars
                  className="reactStars"
                  count={5}
                  color2={'#FFC914'}
                  size={25}
                  onChange={this.ratingChange}
                  value={this.state.rating}
                  />
              </div>
            </div>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control onChange={this.handleInputChange} value={this.state.review} name="review"
              as="textarea" rows="4" placeholder="Add your review"/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.editReview()} variant="primary">
              Add Review
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="oneBook">
          <img className="individualBookImage" src={book.image} alt={book.title} />
          <h1><span>Title:</span> {book.title} </h1>
          <h1><span>Author:</span> {book.author} </h1>
          <h1><span>Publisher:</span> {book.publisher} </h1>
          <h1><span>Published Date:</span>{book.publish_date}</h1>
          <h1><span>List Price:</span> {book.list_price ? book.list_price: "Value Unknown"}</h1>
          <div className="bookDescription">
            <h1> <span> Description:</span>{bookDescription}</h1>
          </div>
          <div className="addCategories">
            {!this.state.owned &&
            <Button onClick={() => this.addBook("own")} className="addButton" variant="primary">
              Add to Own
            </Button>
            }
            {this.state.owned &&
            <Button onClick={() => this.removeBook("own")} className="addButton removebtn">
              Remove from Owned
            </Button>
            }
            {!this.state.favorited &&
            <Button onClick={() => this.addBook("favorites")} className="addButton" variant="primary">
              Add to Favorites
            </Button>
            }
            {this.state.favorited &&
            <Button onClick={() => this.removeBook("favorites")} className="addButton removebtn">
              Remove from Favorites
            </Button>
            }
            {!this.state.read &&
            <Button onClick={() => this.addBook("read")}className="addButton" variant="primary">
              Add to Read
            </Button>
            }
            {this.state.read &&
            <Button onClick={() => this.removeBook("read")} className="addButton removebtn">
              Remove from Read
            </Button>
            }
          </div>
        </div>
        <div className="bookFunctionality">
          <h1 className="reviewTitle"> Reviews </h1>
          {!this.state.reviewed &&
          <div className="bookReviewForm">
            <h1> Add your review </h1>
            <div className="bookReactRatingReview">
              <h2> Rating: </h2>
              <ReactStars
                className="reactStars"
                count={5}
                color2={'#FFC914'}
                size={25}
                onChange={this.ratingChange}
                value={this.state.rating}
                />
            </div>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control onChange={this.handleInputChange} value={this.state.review} name="review"
              as="textarea" rows="4" placeholder="Add your review"/>
              </Form.Group>
            </Form>
            <Button onClick={() => this.addReview()} variant="primary">
              Add Review
            </Button>
          </div>}
          {this.state.reviews.length > 0
          ? this.state.reviews.map(review => {
            console.log('review', review)
            return <div>
                    <div className="writtenReview">
                      <div className="bookReactRating">
                        <h1>Review by: {review.user_id.username}</h1>
                        <ReactStars
                          className="reactStars-reviews"
                          count={5}
                          color2={'#FFC914'}
                          size={25}
                          edit={false}
                          value={review.rating}
                        />
                      </div>
                        <div className="reviewContent">
                          <h1> {review.content}</h1>
                        </div>
                      </div>
                      { this.props.currentUser.id === review.user_id.id && <div  className="editAndDelete">
                        <div onClick={() => this.openModal(review)} className="editing">
                          <img className="editReviewIcon" src={editIcon} alt="edit icon"/>
                        </div>
                        <div onClick={() =>this.deleteReview(review.id)} className="deleting">
                          <img className="editReviewIcon" src={deleteIcon} alt="delete icon"/>
                        </div>
                      </div>}
                    </div>
          })
            : <div className="noReviews">
                <h1>   This book has no reviews </h1>
              </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    currentUser: state.users.currentUser,
    addingCategory: state.category.addingCategory,
    deletingCategory: state.category.deletingCategory,
    addingReview: state.review.addingReview,
    deletingReview: state.review.deletingReview
  }
}

export default connect(mapStateToProps, { addToOwn, addToRead, addToFavorite, removeFromOwn, removeFromRead, removeFromFavorite, addReview, deleteReview, editReview})(Book);

//
// {this.state.reviewed &&
//   <div className="bookReviewForm">
//     <h1> Edit your review </h1>
//     <div className="bookReactRating">
//       <h2> Rating: </h2>
//       <ReactStars
//         className="reactStars"
//         count={5}
//         color2={'#FFC914'}
//         size={25}
//         onChange={this.ratingChange}
//         value={this.state.rating}
//         />
//     </div>
//     <Form>
//       <Form.Group controlId="exampleForm.ControlTextarea1">
//       <Form.Control onChange={this.handleInputChange} value={this.state.review} name="review"
//       as="textarea" rows="4" placeholder="Add your review"/>
//       </Form.Group>
//     </Form>
//     <Button variant="primary">
//       Add Review
//     </Button>
//   </div>}
