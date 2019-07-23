import React from 'react';
import { Route, withRouter } from "react-router-dom";

import Navigation from './Navigation/Navigation';
import Home from './Home';
import Settings from './Components/Settings/Settings';
import Books from './Components/Books/Books';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/settings" render={() => <Settings />} />
      <Route exact path="/books" render={() => <Books />} />
      <Footer />
    </div>
  );
}

export default withRouter(App);
