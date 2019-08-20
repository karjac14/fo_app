import React, { Component } from "react";
import Nav from "./components/Nav";
import landing from "./pages/Landing";
import about from "./pages/About";
import login from "./pages/Login";
import myMeals from "./pages/MyMeals";
import myPreferences from "./pages/MyPreferences";
import myOptions from "./pages/MyOptions";
import myGroceries from "./pages/MyGroceries";
import logOutPage from "./pages/Logout";
import status from "./pages/Triage";
import accountInfo from "./pages/AccountInfo";
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { setAsAuth, setAsNotAuth } from './actions/currentUserActions';
import firebase from 'firebase/app';
import 'firebase/auth';
import propTypes from "prop-types";

import "./styles/global.scss";




class App extends Component {

  componentDidMount() {

    moment.updateLocale("en", {
      week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }
    });

    let unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.getIdToken().then(idToken => {
          this.props.setAsAuth(user.uid, idToken);
          unsubscribe();
        });
      } else {
        this.props.setAsNotAuth();
        unsubscribe();
      }
    });
  }

  render() {

    const { isAuth } = this.props

    //if the `isAuth` value is still has the default value of null, show spinner
    if (isAuth === null) {
      return (
        <div className="App">
          {/* <div className="text-center">
          <div id="loading-spinner"></div>
          </div> */}
        </div>
      );
    }
    //else if the `isAuth` is known to be true or false, show the router
    return (

      < Router >
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={status} />
            <Route exact path="/about" component={about} />
            <Route exact path="/login" component={login} />
            <Route exact path="/welcome" component={landing} />
            <PrivateRoute path="/account" component={accountInfo} isAuth={isAuth} />
            <Route exact path="/logout" component={logOutPage} />
            <PrivateRoute path="/my-preferences" component={myPreferences} isAuth={isAuth} />
            <PrivateRoute path="/my-options" component={myOptions} isAuth={isAuth} />
            <PrivateRoute path="/my-meals" component={myMeals} isAuth={isAuth} />
            <PrivateRoute path="/my-groceries" component={myGroceries} isAuth={isAuth} />
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
  setAsNotAuth: propTypes.func.isRequired,
  location: propTypes.object
}

PrivateRoute.propTypes = {
  component: propTypes.object,
  location: propTypes.object,
  isAuth: propTypes.bool
}

function mapStateToProps(state) {
  const { currentUser } = state
  return { isAuth: currentUser.isAuth }
}

export default connect(mapStateToProps, { setAsAuth, setAsNotAuth })(App)
