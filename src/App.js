import React, { Component } from "react";
import Nav from "./components/Nav";
import landing from "./pages/landing";
import about from "./pages/about";
import login from "./pages/login";
import myMeals from "./pages/myMeals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { setAsAuth } from './actions/currentUserActions';
import * as firebase from "firebase";
import propTypes from "prop-types";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingAuth: true
    };
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //set store to isAuth true
        this.props.setAsAuth(user.uid);
      }
      this.setState({ checkingAuth: false });
    });
  }

  render() {

    const { checkingAuth } = this.state;
    const { isAuth } = this.props
    console.log(isAuth);

    //if checkingAuth is true, show spinner first.
    if (checkingAuth) {
      return (
        <div className="App">
          Spinner!
        </div>
      );
    }

    return (
      < Router >
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={landing} />
            <Route exact path="/about" component={about} />
            <Route exact path="/login" component={login} />
            <Route exact path="/my-meals" component={myMeals} />
          </Switch>
        </div>
      </Router >
    );
  }
}

App.propTypes = {
  isAuth: propTypes.bool.isRequired,
  setAsAuth: propTypes.func.isRequired,
}

function mapStateToProps(state) {

  const { currentUser } = state
  return { isAuth: currentUser.isAuth }
}

export default connect(mapStateToProps, { setAsAuth })(App)
