import React from 'react'
import NavBar from './NavBar';

import logo from './../public/images/logo.png';

const Navigation = props => {
    return(
      <div>
        <section>
          <img src={logo} alt="bookr logo" />
          <NavBar />
        </section>
      </div>
    )
}

export default Navigation;
