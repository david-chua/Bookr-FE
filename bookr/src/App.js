import React from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import Navigation from './Navigation/Navigation';
import Home from './Home';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import Books from './Components/Books/Books';
import LogInOrRegister from "./Components/Auth/Login";
import Footer from './Footer';
import { GET_CURRENT_USER_QUERY } from './graphQL/queries'

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const token = localStorage.getItem("token");
  const client = new ApolloClient({
    uri: "http://localhost:9090",
    headers: { authorization: token}
  })
  client.query({ query: GET_CURRENT_USER_QUERY })
    .then(response => {
    })
    .catch(err => {
      localStorage.removeItem("token"); //If token expired or not valid, remove it
    });

  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          Component ? (
            <Component {...props} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/news" render={() => <News />} />
      <Route exact path="/login" render={() => <LogInOrRegister />} />
      <PrivateRoute exact path="/settings" render={() => <Settings />} />
      <Route exact path="/books" render={() => <Books />} />
      <Footer />
    </div>
  );
}

export default withRouter(App);
