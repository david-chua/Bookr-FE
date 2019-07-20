import React from 'react'


class Navigation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchInput: '',
    }
  }

  render(){
    return(
      <div>
        <h1> Bookr </h1>
      </div>
    )
  }
}

export default Navigation;
