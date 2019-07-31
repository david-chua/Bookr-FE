import React from 'react';
import { connect } from "react-redux";

class Settings extends React.Component{
  constructor(props){
    super(props)
    this.state ={

    }
  }

  render(){
    console.log(this.props);
    return(
      <div className="settingsContainer">
        <h1> Welcome  {this.props.currentUser.first_name}</h1>
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
