import React from 'react';
import { connect } from "react-redux";
import editIcon from '../../public/images/editIcon.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { editUser, editPassword } from '../../actions/usersActions';

class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state ={
        editing: false,
        editingPW: false,
        password: '',
        confirmPassword: '',
        oldPassword: '',
        gender: '',
        message: '',
        error: ''
    }
  }

  openEdit = () => {
    this.setState({
      editing: true,
      editingPW: false,
      first_name: this.props.currentUser.first_name,
      last_name: this.props.currentUser.last_name,
      email: this.props.currentUser.email,
      username: this.props.currentUser.username,
      gender: this.props.currentUser.gender,
    })
  }

  openEditPW = () => {
    this.setState({
      editingPW: true,
      editng: false
    })
  }

  closeEditPW = () => {
    this.setState({
      editingPW: false
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


  editInfo = e => {
    e.preventDefault();
    const id = this.props.currentUser.id;
    const userInfo = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      gender: this.state.gender
    }
    this.props.editUser(id, userInfo);
    this.setState({
      editing: false
    })
  }

  editPassword = async e => {
    e.preventDefault();
    const id = this.props.currentUser.id;
    const input = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.password
    }
    if (this.state.password === this.state.confirmPassword){
        this.props.editPassword(id, input);
        await this.setState({
          editingPW: false,
          message: 'your password has been updated'
        })
    } else {
      this.setState({
        error: "Passwords do not match",
        editingPW: false,
        oldPassword: '',
        password: '',
        confirmPassword: ''
      });
    }
  }

  componentDidUpdate(){
    setTimeout(() => this.setState({message:'', error: ''}), 9000);
  }

  componentWillUnmount(){
    setTimeout(() => this.setState({message:'', error: ''}), 9000);
  }

  render(){
    return(
      <div className="settingsContainer">
      <Modal show={this.state.editingPW} onHide={this.closeEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="registerGoogle">Current Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.oldPassword} name="oldPassword" type="password" placeholder="Enter Current Password" />
            </Form.Group>
            <Form.Group >
              <Form.Label className="registerGoogle">New Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.password} name="password" type="password" placeholder="Enter New Password" />
            </Form.Group>
            <Form.Group >
              <Form.Label className="registerGoogle">Confirm New Password</Form.Label>
              <Form.Control onChange={this.handleChange} value={this.state.confirmPassword} name="confirmPassword" type="password" placeholder="Confirm New Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeEditPW}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={this.editPassword}>
            Save Changes
          </Button>

        </Modal.Footer>
      </Modal>
        <Modal show={this.state.editing} onHide={this.closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="registerGoogle">Edit First Name</Form.Label>
                <Form.Control onChange={this.handleChange} value={this.state.first_name} name="first_name" type="text" placeholder="Edit First Name" />
              </Form.Group>
              <Form.Group >
                <Form.Label className="registerGoogle">edit Last Name</Form.Label>
                <Form.Control onChange={this.handleChange} value={this.state.last_name} name="last_name" type="text" placeholder="Edit Last Name" />
              </Form.Group>
              <Form.Group >
                <Form.Label className="registerGoogle">Edit Email Name</Form.Label>
                <Form.Control onChange={this.handleChange} value={this.state.email} name="email" type="text" placeholder="Edit Email" />
              </Form.Group>
              <Form.Group >
                <Form.Label className="registerGoogle">Edit Username</Form.Label>
                <Form.Control onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Edit Username" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="registerValues">Select Gender </Form.Label>
                <Form.Control value={this.state.gender} name="gender" onChange={this.handleChange} as="select">
                  <option>Select an option</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="N/A">Decline to Answer</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeEdit}>
              Close
            </Button>
            <Button variant="primary" type="button" onClick={this.editInfo}>
              Save Changes
            </Button>

          </Modal.Footer>
        </Modal>
        <div className="settingOptions">
          <div className="settingOption">
            <h2> Account Information </h2>
          </div>
          <div className="settingOption">
            <h2> Billing (Coming Soon) </h2>
          </div>
        </div>

        <div className="accountInfo">
          <div className="accountInfoTitle">
            <h1> Account Information </h1>
            <img onClick={this.openEdit} className="editIcon" src={editIcon} alt="edit icon"/>
          </div>
          <div className="accountPasswordEdit">
            <h2> Edit Password</h2>
            <img onClick={this.openEditPW} className="editPWIcon" src={editIcon} alt="edit password icon" />
          </div>
          <div className="accountInformation">
            {this.state.message ? <h4 className="successMessage"> {this.state.message} </h4> : null}
            {this.state.error ? <h4 className="errorMessage"> {this.state.error} </h4> : null}
            {this.props.graphqlError ? <h4 className="errorMessage"> {this.props.graphqlError} </h4> : null}
            <h2> Name: </h2>
            <h3>{this.props.currentUser.first_name}{'  '}{this.props.currentUser.last_name}</h3>
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
    loggedIn: state.users.loggedIn,
    graphqlError: state.users.error,
  }
}


export default connect(mapStateToProps, {editUser, editPassword})(Settings);


//Currently no subscription plans
// <div className="settingOption">
//   <h2> Billing </h2>
// </div>
