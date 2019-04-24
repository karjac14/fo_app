import React, { Component } from "react";
import Nav from "./components/Nav";
import landing from "./pages/landing";
import about from "./pages/about";
import login from "./pages/login";
import myMeals from "./pages/myMeals";
import myPreferences from "./pages/myPreferences";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setAsAuth, setAsNotAuth } from './actions/currentUserActions';
import * as firebase from "firebase";
import propTypes from "prop-types";

class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //set store to isAuth true
        this.props.setAsAuth(user.uid);
      } else {
        this.props.setAsNotAuth();
      }
    });
  }

  render() {

    const { isAuth } = this.props

    //if the `isAuth` value is still has the default value of null, show spinner
    if (isAuth === null) {
      return (
        <div className="App">
          <div className="text-center">
            Spinner!
          </div>
        </div>
      );
    }

    //else if the `isAuth` is known to be true or false, show the router
    return (
      < Router >
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={landing} />
            <Route exact path="/about" component={about} />
            <Route exact path="/login" component={login} />
            <PrivateRoute path="/my-meals" component={myMeals} isAuth={isAuth} />
            <PrivateRoute path="/my-preferences" component={myPreferences} isAuth={isAuth} />
          </Switch>
        </div>
      </Router >
    );
  }
}

function PrivateRoute({ component: Component, isAuth, ...rest }) {

  return (
    <Route
      {...rest}
      render={props =>
        isAuth === true ? (
          <Component {...props} />
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
}

App.propTypes = {
  setAsAuth: propTypes.func.isRequired,
  setAsNotAuth: propTypes.func.isRequired
}

function mapStateToProps(state) {
  const { currentUser } = state
  return { isAuth: currentUser.isAuth }
}

export default connect(mapStateToProps, { setAsAuth, setAsNotAuth })(App)
