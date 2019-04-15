import React, { Component } from "react";
import Nav from "./components/Nav";
import landing from "./pages/landing";
import about from "./pages/about";
import login from "./pages/login";
import myMeals from "./pages/myMeals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import * as firebase from "firebase";




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        //set store to isAuth true
      } else {
        console.log("nouser");
        //set store to isAuth true
      }
    });
  }




  


  render() {
    return (
      <Provider store={store}><Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={landing} />
            <Route exact path="/about" component={about} />
            <Route exact path="/login" component={login} />
            <Route exact path="/myMeals" component={myMeals} />
          </Switch>
        </div>
      </Router></Provider>
    );
  }
}

export default App;
