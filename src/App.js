import React, { Component } from "react";
import Nav from "./components/Nav";
import landing from "./pages/landing";
import about from "./pages/about";
import login from "./pages/login";
import myMeals from "./pages/myMeals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
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
