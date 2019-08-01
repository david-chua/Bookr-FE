import React from 'react';
import { connect } from "react-redux";
import editIcon from '../../public/images/editIcon.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { editUser } from '../../actions/usersActions';

class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state ={
        editing: false
    }
  }

  openEdit = () => {
    console.log('open edit');
    this.setState({
      editing: true,
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      username: this.props.currentUser.username,
      gender: this.props.currentUser.gender,
      password: '',
      confirmPassword: ''
    })
  }

  closeEdit = () => {
    this.setState({
      editing: false
    })
  }

  handleChange= e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render(){
    console.log(this.state);
    console.log(this.props);
    return(
      <div className="settingsContainer">
        <Modal show={this.state.editing} onHide={this.closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group >
              <Form.Label className="registerGoogle">Enter First Name</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.first_name} name="first_name" type="text" placeholder="Edit First Name" />
            </Form.Group>
            <Form.Group >
              <Form.Label className="registerGoogle">Enter First Name</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.last_name} name="last_name" type="text" placeholder="Edit Last Name" />
            </Form.Group>
            <Form.Group >
              <Form.Label className="registerGoogle">Enter First Name</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Edit Email" />
            </Form.Group>
            <Form.Group >
              <Form.Label className="registerGoogle">Enter First Name</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Edit Username" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={this.closeEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="settingOptions">
          <div className="settingOption">
            <h2> Account Information </h2>
          </div>
        </div>

        <div className="accountInfo">
          <div className="accountInfoTitle">
            <h1> Account Information </h1>
            <img onClick={this.openEdit} className="editIcon" src={editIcon} alt="edit icon"/>
          </div>
          <div className="accountInformation">
            <h2> Name: </h2>
            <h3>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</h3>
          </div>
          <div className="accountInformation">
            <h2> Username </h2>
            <h3>{this.props.currentUser.username}</h3>
          </div>
          <div className="accountInformation">
            <h2> Email </h2>
            <h3>{this.props.currentUser.email}</h3>
          </div>
          <div className="accountInformation">
            <h2> Subscription Level  </h2>
            <h3>{this.props.currentUser.userType}</h3>
          </div>
          <div className="accountInformation">
            <h2> Gender  </h2>
            <h3>{this.props.currentUser.gender}</h3>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    loggedIn: state.users.loggedIn
  }
}


export default connect(mapStateToProps, {})(Settings);


//Currently no subscription plans
// <div className="settingOption">
//   <h2> Billing </h2>
// </div>
